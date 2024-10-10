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

  /*
  const { fitView } = useReactFlow();
  const fitViewToAnotherSlide = useCallback(
    (event, id) => {
      event.stopPropagation();
      fitView({ nodes: [{id}], duration: 500 });
    },
    [fitView],
  ); */

  return (
    <article className={styles.slide} style={style}>

      <MDXRenderer mdxContent={data.content} />

      {/*
      <footer className="slide__controls nopan">
        {data.left && (<button onClick={(e) => fitViewToAnotherSlide(e, data.left)}>←</button>)}
        {data.up && (<button onClick={(e) => fitViewToAnotherSlide(e, data.up)}>↑</button>)}
        {data.down && (<button onClick={(e) => fitViewToAnotherSlide(e, data.down)}>↓</button>)}
        {data.right && (<button onClick={(e) => fitViewToAnotherSlide(e, data.right)}>→</button>)}
      </footer>

      */}

    </article>
  );
}
