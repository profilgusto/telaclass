import React, { useState, useCallback, useEffect } from 'react';
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


const SlidesRendererInner = ({ mdxContentSlides, isPresentationMode, onPresentationMode }) => {
    
    const [currentSlide_id, setCurrentSlide_id] = useState(INITIAL_SLIDE);
    

    // splits the mdx content into splits for each section/slide
    const mdxSplits = splitMdxContent(mdxContentSlides);

    // converts the mdx splits into nodes and edges for the react flow
    const { nodes, edges } = slidesToReactFlowNodes(mdxSplits);

    // handles the click on a node
    const { fitView } = useReactFlow();
    const handleNodeClick = useCallback(
        (_, node) => {
            fitView({ nodes: [node], duration: 500 });
            setCurrentSlide_id(node.id);
        },
        [fitView],
    );

    const handleKeyPress = useCallback(
        (event) => {
          const currentSlide_node = nodes[currentSlide_id];
     
          switch (event.key) {
            case 'ArrowLeft':
            case 'ArrowRight':

                const direction = event.key.slice(5).toLowerCase();

                if (direction == 'left' && currentSlide_node.data.slide_previous_id) {
                    event.preventDefault();
                    setCurrentSlide_id(currentSlide_node.data.slide_previous_id);
                    fitView({ nodes: [{ id: currentSlide_node.data.slide_previous_id }], duration: 500  });
                } else if (direction == 'right' && currentSlide_node.data.slide_next_id) {
                    event.preventDefault();
                    setCurrentSlide_id(currentSlide_node.data.slide_next_id);
                    fitView({ nodes: [{ id: currentSlide_node.data.slide_next_id }], duration: 500  });
                }
          }
        },
        [currentSlide_id, fitView],
      );


    // button for changing for presentation mode
    const handleButPresentationMode = useCallback(
        () => {
            onPresentationMode(!isPresentationMode);
            // TODO The below fitView is not working properly. It is not fitting the view to the current slide.
            //fitView({ nodes: [{ id: currentSlide_id }], duration: 500  });
        },
        [isPresentationMode],
    );

    // for fitViewing the current slide after changing the SlidesRendererInner size
    useEffect(() => {
        setTimeout(() => {
            fitView({ nodes: [{ id: currentSlide_id }], duration: 500  });
        }, 50);
    }, [isPresentationMode]);

    return (
        <div className={`${styles.slidesContainer} ${styles[isPresentationMode ? 'fullScreen' : '']}`}>
                <button className={styles.but_presentationMode}    onClick={ handleButPresentationMode }>{isPresentationMode ? 'Goto embedded mode' : 'Goto presentation mode'}</button>
                <ReactFlow 
                    nodes={nodes} 
                    nodeTypes={NODE_TYPES} 
                    fitView
                    fitViewOptions={{nodes: [{id: INITIAL_SLIDE}]}}
                    minZoom={0.1}
                    onNodeClick={handleNodeClick}
                    onKeyDown={handleKeyPress}
                />
        </div>
    );
};


// I was obliged to create an outer component because of the ReactFlowProvider, that must be outside the ReactFlow component
const SlidesRenderer = ({ mdxContentSlides, isPresentationMode, onPresentationMode }) => {
    return (
        <ReactFlowProvider>
            <SlidesRendererInner 
                mdxContentSlides={mdxContentSlides} 
                isPresentationMode={isPresentationMode} 
                onPresentationMode={onPresentationMode}
            />
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