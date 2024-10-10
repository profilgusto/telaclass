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

  console.log('cp0');
  console.log(data);

  const { fitView } = useReactFlow();
  const fitViewToAnotherSlide = useCallback(
    (event, id) => {
      event.stopPropagation();
      fitView({ nodes: [{id}], duration: 500 });
    },
    [fitView],
  );

  return (
    <article className={styles.slide} style={style}>

      <MDXRenderer mdxContent={data.content} />

      
      <footer class name={styles.slide__controls}> 
        {data.slide_previous_id && (<button onClick={(e)=>fitViewToAnotherSlide(e, data.slide_previous_id)}>←</button>)}
        {data.slide_next_id && (<button onClick={(e)=>fitViewToAnotherSlide(e, data.slide_next_id)}>→</button>)}
      </footer>


    </article>
  );
}
