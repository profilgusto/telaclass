import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

// For katex support on ReactMarkdown
import {createRoot} from 'react-dom/client'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

// Import styles
import './style.css'
import 'katex/dist/katex.min.css'

const Content = () => {

  const [markdownContent, setMarkdownContent] = useState('');

  // loads the markdown file containing the class content
  useEffect(() => {
    fetch('/disciplina/aula-teoria.md')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((text) => setMarkdownContent(text))
      .catch((error) => {
        console.error('We could not load the markdown file:', error);
      });
  }, []);

  return (
    <main className="content">
      {/* Aqui você irá renderizar o conteúdo do Markdown */}
      <p>Nesta aula iremos ver TUDO DE BOOOM</p>
      {/* <ReactMarkdown>{markdownContent}</ReactMarkdown> */}
      
      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {markdownContent}
      </ReactMarkdown>

     
    </main>
  );
  }

  export default Content
