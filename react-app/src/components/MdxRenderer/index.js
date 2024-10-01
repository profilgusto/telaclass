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

  //console.log("CP1");

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

      // TODO ESTOU AQUI
      //console.log("CP2");
      //console.log(content);
      //console.log("CP3");
      //console.log(<MDXProvider>{content}</MDXProvider>);
      // TODO rever isto daqui. Deve-se procurar por todos 'pre code' apenas dentro de content
      // do jeito que está agora está fazendo para toda a página web

      // Highlighting the code blocks
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
      });


    }
  }, [content]);
  
  return <MDXProvider>{content}</MDXProvider>;
};

export default MDXRenderer;
