import { useReactFlow } from '@xyflow/react';
import { useCallback } from 'react';

import MDXRenderer from '../MdxRenderer';
 
export const SLIDE_WIDTH = 1920;
export const SLIDE_HEIGHT = 1080;
 
const style = {
  width: `${SLIDE_WIDTH}px`,
  height: `${SLIDE_HEIGHT}px`,
};


export function Slide( { slideContentData } ) {

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
    <article className="slide nodrag" style={style}>

      <MDXRenderer mdxContent={slideContentData} />

      
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