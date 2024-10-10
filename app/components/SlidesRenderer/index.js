import React, { useCallback } from 'react';
import { ReactFlow, ReactFlowProvider, useReactFlow } from '@xyflow/react';

// import { ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { Slide } from './Slide';
import slidesToReactFlowNodes from './slidesToReactFlowNodes.js';


// Import styles
import styles from './style.module.css';


// constants
const NODE_TYPES = {
    slide: Slide,
  };

const INITIAL_SLIDE = '0';



const SlidesRendererInner = ({ mdxContentSlides }) => {

    // splits the mdx content into splits for each section/slide
    const mdxSplits = splitMdxContent(mdxContentSlides);

    // converts the mdx splits into nodes and edges for the react flow
    const { nodes, edges } = slidesToReactFlowNodes(mdxSplits);


    // handles the click on a node
    const { fitView } = useReactFlow();
    const handleNodeClick = useCallback(
        (_, node) => {
          fitView({ nodes: [node], duration: 500 });
        },
        [fitView],
      );


    return (
        <div className={styles.slidesContainer}>
                <ReactFlow 
                    nodes={nodes} 
                    nodeTypes={NODE_TYPES} 
                    fitView
                    fitViewOptions={{nodes: [{id: INITIAL_SLIDE}]}}
                    minZoom={0.1}
                    onNodeClick={handleNodeClick}
                />
        </div>
    );
};


// I was obliged to create an outer component because of the ReactFlowProvider, that must be outside the ReactFlow component
const SlidesRenderer = ({ mdxContentSlides }) => {
    return (
        <ReactFlowProvider>
            <SlidesRendererInner mdxContentSlides={mdxContentSlides} />
        </ReactFlowProvider>
    );
};

export default SlidesRenderer;


// Splits the mdx single into each section/slides content.
function splitMdxContent(mdxContent) {
    const regex = /(?=(?:^|\n)(#\s|##\s))/g;
    return mdxContent
        .split(regex)
        .map(section => section.trim())
        .filter(section => section != '##' && section != '#');
}