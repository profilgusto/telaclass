import React, { useState, useEffect } from 'react';

import MDXRenderer from '../MdxRenderer';

import slidesToReactFlowNodes from './slidesToReactFlowNodes.js';

// Import styles
import styles from './style.module.css';


// constants
const NODE_TYPES = {
    slide: Slide,
  };

const INITIAL_SLIDE = '0';


const SlidesRenderer = ({ mdxContentSlides }) => {

    // splits the mdx content into splits for each section/slide
    const mdxSplits = splitMdxContent(mdxContentSlides);

    slides = 

    const { nodes, edges } = slidesToReactFlowNodes(INITIAL_SLIDE, slides);

    return (
        <div className={styles.slidesContainer}>
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

export default SlidesRenderer;


// Splits the mdx single into each section/slides content.
function splitMdxContent(mdxContent) {
    const regex = /(?=(?:^|\n)(#\s|##\s))/g;
    return mdxContent
        .split(regex)
        .map(section => section.trim())
        .filter(section => section != '##' && section != '#');
}