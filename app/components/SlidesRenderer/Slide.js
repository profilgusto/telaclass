import { useReactFlow } from '@xyflow/react';
import { useCallback } from 'react';

import MDXRenderer from '../MdxRenderer';

import styles from "./Slide.style.module.css";
 
export const SLIDE_WIDTH = 1920;
export const SLIDE_HEIGHT = 1080;
 
const style = {
  width: `${SLIDE_WIDTH}px`,
  height: `${SLIDE_HEIGHT}px`,
};


export function Slide( { data } ) {

  // ftting view to another slide based on the given id
  const { fitView } = useReactFlow();
  

  const fitViewToAnotherSlide = useCallback(
    (event, id) => {
      event.stopPropagation();
      fitView({ nodes: [{id}], duration: 500 });
    },
    [fitView],
  );

  // determine the classname based on the slide type
  const slideClassStyle = data.content.startsWith('##') ? 'slide_regular' : data.content.startsWith('#') ? 'slide_title' : '';


  return (
    <article className={`${styles.slide} ${styles[slideClassStyle]}` } style={style}>

      <MDXRenderer mdxContent={data.content} />

      <footer className={styles.slide__controls}> 
        {data.slide_previous_id && (<button onClick={(e)=>fitViewToAnotherSlide(e, data.slide_previous_id)}>←</button>)}
        {data.slide_next_id && (<button onClick={(e)=>fitViewToAnotherSlide(e, data.slide_next_id)}>→</button>)}
      </footer>


    </article>
  );
}
