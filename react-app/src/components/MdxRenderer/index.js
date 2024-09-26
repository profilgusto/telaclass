/*
This component receives a deserialized .mdx file (as fetched from an API or loaded from a file)
, compiles it (transforms it to JSX) and then run it (creating a React component)
It returns a React component with the rendered content from the original .mdx file
*/
import React, { useEffect, useState } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { compile, run } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime'

import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

const MDXRenderer = ({ mdxContent }) => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const renderMDX = async () => {
      const compiled = await compile(await mdxContent, { outputFormat: 'function-body' });
      const {default: ContentMdx} = await run(compiled, {...runtime, baseUrl: import.meta.url});
      setContent(<ContentMdx />);
    };

    renderMDX();
  }, [mdxContent]);

  // adicionando o highlight
  useEffect(() => {
    if (content) {
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
      });
    }
  }, [content]);
  
  return <MDXProvider>{content}</MDXProvider>;
};

export default MDXRenderer;
