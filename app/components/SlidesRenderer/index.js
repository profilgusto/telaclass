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

const SlidesRendererInner = ({ mdxContentSlides, isPresentationMode, onPresentationMode, selectedLesson }) => {
    
    const [currentSlide_id, setCurrentSlide_id] = useState(INITIAL_SLIDE);

    // splits the mdx content into splits for each section/slide
    const mdxSplits = splitMdxContent(mdxContentSlides);

    // converts the mdx splits into nodes and edges for the react flow
    const { nodes, edges } = slidesToReactFlowNodes(mdxSplits);

    const { fitView } = useReactFlow();

    // handles the click on a node
    const handleNodeClick = useCallback(
        (_, node) => {
            fitView({ nodes: [node], duration: 500 });
            setCurrentSlide_id(node.id);
        },
        [fitView],
    );

    const handleKeyPress = useCallback(
        (event) => {
            event.preventDefault();
            const currentSlide_node = nodes[currentSlide_id];

          // treating to pass slides
            switch (event.key) {
            case 'ArrowUp':
            case 'ArrowDown':
            case 'ArrowLeft':
            case 'ArrowRight':
                
                const direction = event.key.slice(5).toLowerCase();

                if (direction === 'up' && currentSlide_node.data.slide_previous_id) {
                    event.preventDefault();
                    setCurrentSlide_id(currentSlide_node.data.slide_previous_id);
                    fitView({ nodes: [{ id: currentSlide_node.data.slide_previous_id }], duration: 500  });

                } else if (direction === 'down' && currentSlide_node.data.slide_next_id) {
                    event.preventDefault();
                    setCurrentSlide_id(currentSlide_node.data.slide_next_id);
                    fitView({ nodes: [{ id: currentSlide_node.data.slide_next_id }], duration: 500  });

                } else if  (direction === 'left' && currentSlide_node.data.section_previous_id) {
                    event.preventDefault();
                    setCurrentSlide_id(currentSlide_node.data.section_previous_id);
                    fitView({ nodes: [{ id: currentSlide_node.data.section_previous_id }], duration: 500  });                    

                } else if (direction === 'right' && currentSlide_node.data.section_next_id) {                   
                    event.preventDefault();
                    setCurrentSlide_id(currentSlide_node.data.section_next_id);
                    fitView({ nodes: [{ id: currentSlide_node.data.section_next_id }], duration: 500  });
                }
            }

            // tries to avoid losing focus after a keystroke
            setTimeout(() => {
                const reactFlowNode = document.querySelector('.react-flow__node');
                if (reactFlowNode) {
                    reactFlowNode.focus();
                }
            }, 200);

        },
        [currentSlide_id, fitView],
      );

    // button for changing for presentation mode
    const handleButPresentationMode = useCallback(
        () => {
            onPresentationMode(!isPresentationMode);
        },
        [isPresentationMode],
    );

    
    // for fitViewing the current slide after changing the SlidesRendererInner size
    useEffect(() => {
        setTimeout(() => {
            fitView({ nodes: [{ id: currentSlide_id }], duration: 500  });
        }, 50);
    }, [isPresentationMode]); 


    // runs fitView to first slide everytime the selectedLesson changes
    useEffect(() => {
        setTimeout(() => {
            setCurrentSlide_id(INITIAL_SLIDE);
            fitView({ nodes: [{ id: INITIAL_SLIDE }], duration: 500  });
        }, 100);
    }, [selectedLesson]);


    return (
        <div className={`${styles.slidesContainer} ${styles[isPresentationMode ? 'fullScreen' : '']}`} >
                <button className={styles.but_presentationMode}    onClick={ handleButPresentationMode }>{isPresentationMode ? 'Goto embedded mode' : 'Goto presentation mode'}</button>
                <ReactFlow 
                    nodes={nodes} 
                    nodeTypes={NODE_TYPES} 
                    nodesDraggable={false}
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
const SlidesRenderer = ({ mdxContentSlides, isPresentationMode, onPresentationMode, selectedLesson }) => {

    return (
        <ReactFlowProvider>
            <SlidesRendererInner 
                mdxContentSlides={mdxContentSlides} 
                isPresentationMode={isPresentationMode} 
                onPresentationMode={onPresentationMode}
                selectedLesson={selectedLesson}
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
        .filter(section => section !== '##' && section !== '#');
}