import React, { useState, useEffect } from 'react';

import MDXRenderer from '../MdxRenderer';

// Import styles
import styles from './style.module.css';

const SlidesRenderer = ({ mdxContentSlides }) => {

    console.log(mdxContentSlides);
    const splits = splitMdxContent(mdxContentSlides);
    console.log(splits);

    return (

        <MDXRenderer mdxContent={mdxContentSlides} />
    );
};

export default SlidesRenderer;

function splitMdxContent(mdxContent) {
    const regex = /(?=(?:^|\n)(#\s|##\s))/g;
    return mdxContent
        .split(regex)
        .map(section => section.trim())
        .filter(section => section != '##' && section != '#');
}