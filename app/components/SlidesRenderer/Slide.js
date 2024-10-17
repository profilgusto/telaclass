import React, { useCallback, useRef, useEffect, useState } from 'react';
import { useReactFlow } from '@xyflow/react';

import MDXRenderer from '../MdxRenderer';

import styles from "./Slide.style.module.css";
 
export const SLIDE_WIDTH = 1920;
export const SLIDE_HEIGHT = 1080;
 
const style = {
  width: `${SLIDE_WIDTH}px`,
  height: `${SLIDE_HEIGHT}px`,
};


export function Slide( { data } ) {
  const refDivContent = useRef(null);

  const [contentHeights, setContentHeights] = useState([]);
  const [slideRendered, setSlideRendereed] = useState(false);


  // ftting view to another slide based on the given id
  const { fitView } = useReactFlow();
  

  const fitViewToAnotherSlide = useCallback(
    (event, id) => {
      event.stopPropagation();
      fitView({ nodes: [{id}], duration: 500 });
    },
    [fitView],
  );


  // determine the slide type (classname) based on the slide type
  const slideClassStyle = data.content.startsWith('##') ? 'slide_regular' : data.content.startsWith('#') ? 'slide_header' : '';

  // resizes the height of the last element of the content to fit the height of the slide
  useEffect(() => {
    // only applies this height tweak to regular slides
    if (slideClassStyle === 'slide_regular') {
      // test if there is any content inside the reference
      if (refDivContent.current) {
        // the whole content is always inserted within a div (MDXREnderer thing)
        const firstChild = refDivContent.current.firstChild;
        if (firstChild) {
          // lists all the content elements in an array
          const contentChildren = Array.from(firstChild.children);

          // removes the first element of childrenofFirstChild array as it is always a "link" element which is rendered by the MDX Renderer
          contentChildren.shift();

          // retrieves the last element of the slide
          const lastElement = contentChildren[contentChildren.length - 1];
          
          // --> treats if the last element is an image
          // remarks that it retrieves the child of a p because the MDXRenderer always wraps the images with a <p> tag (IIII doooont know whyyyy)
          if (lastElement && lastElement.tagName === 'P' && lastElement.firstChild.tagName === 'IMG') {
            const lastElementNewHeight = computeLastElementSize(refDivContent, contentChildren, lastElement);
            lastElement.firstChild.style.height = `${lastElementNewHeight}px`;
          }

          // --> treats if the last element is an iframe (youtube videos?, not necessarily)
          if ( lastElement && lastElement.tagName === 'P' && lastElement.firstChild.tagName === 'IFRAME') {

            //console.log('cp1');
            //console.log(lastElement);

            const lastElementNewHeight = computeLastElementSize(refDivContent, contentChildren, lastElement);
            lastElement.firstChild.style.height = `${lastElementNewHeight}px`;
          }
        }
      }
    }
  }, [slideRendered, data]);

  // setting the rendered flag
  useEffect(() => {
    setSlideRendereed(true);
  }, []);

  return (
    <article className={`${styles.slide} ${styles[slideClassStyle]}` } style={style}>

      <div className={styles.slide__content} ref={refDivContent}>
        <MDXRenderer mdxContent={data.content} />
      </div>

      <footer className={styles.slide__controls}> 
        {data.slide_previous_id && (<button onClick={(e)=>fitViewToAnotherSlide(e, data.slide_previous_id)}>←</button>)}
        {data.slide_next_id && (<button onClick={(e)=>fitViewToAnotherSlide(e, data.slide_next_id)}>→</button>)}
      </footer>


    </article>
  );
}


// generate computeLastElementSize
const computeLastElementSize = (refDivContent, contentChildren, lastElement) => {
  // retrieves the height of refDifContent
  const RefDifContent_height = refDivContent.current.offsetHeight;

  // computes an array that each index is the height of each element summed to the margin to the next element     
  const heightArray = Array.from(contentChildren).map((element, index, array) => {
    if (index === array.length - 1) {
      return element.offsetHeight;
    }
  
    const nextElement = array[index + 1];
    const effectiveMargin = getEffectiveMargin(element, nextElement);
  
    return element.offsetHeight + effectiveMargin;
  });
  
  // computes the height of the last element to fit the slide height
  const heightPartialSum = heightArray.slice(0, heightArray.length - 1).reduce((acc, height) => acc + height, 0);
  
  return RefDifContent_height - heightPartialSum;
};

// computes the effective margin between any two rendered HTML elements
const getEffectiveMargin = (element1, element2) => {
  const style1 = window.getComputedStyle(element1);
  const style2 = window.getComputedStyle(element2);

  const marginBottom1 = parseFloat(style1.marginBottom);
  const marginTop2 = parseFloat(style2.marginTop);

  return marginBottom1 + marginTop2;
};