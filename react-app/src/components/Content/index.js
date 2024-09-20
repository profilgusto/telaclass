import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

// For katex support on ReactMarkdown
import {createRoot} from 'react-dom/client'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

// Import styles
import './style.css'
import 'katex/dist/katex.min.css'

const Content = ({ planoDeAulas, selectedLesson, content_url }) => {

  const [markdownContent, setMarkdownContent] = useState(null);

  // fetching the content markdown file
  useEffect(() => {
    if (selectedLesson!=null){ // if there is a selected lesson from the sidebar
      const lessonPathMD = content_url + planoDeAulas[selectedLesson].path;
      fetch(lessonPathMD)
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
    } else {
      setMarkdownContent(null);
    }
  }, [selectedLesson]); 


  // Caso ainda não haja nada selecionado...
  if (selectedLesson==null) {
    return <main className="content">Selecione uma aula no menu lateral</main>;
  }


  return (
    <main className="content">

      <ReactMarkdown 
        remarkPlugins={[remarkMath]} 
        rehypePlugins={[rehypeKatex]}>
          {markdownContent}
      </ReactMarkdown>

      
     
    </main>
  );
  }

  export default Content
