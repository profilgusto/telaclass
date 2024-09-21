import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

// For katex support on ReactMarkdown
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import rehypeRaw from 'rehype-raw';


// Import styles
import './style.css'
import 'katex/dist/katex.min.css'

// PARAMETERS
const ATTACHMENTS_PATH = '_attachments/';

const Content = ({ planoDeAulas, selectedLesson, content_url }) => {

  // Defining states
  const [markdownContent, setMarkdownContent] = useState(null);

  // Defining functions
  const treatMarkdownContent = (content) => {
    const baseUrl = content_url+ATTACHMENTS_PATH;

    // Treating PDF files
    // TODO - Tratar também quando .PDF está em maiúsculo
    content = content.replace(/!\[\[(.*?)\.pdf\]\]/g, `<embed src="${baseUrl}$1.pdf" width="600" height="500" type="application/pdf">`);
    
    // Treating images
    // TODO - Pesquisar especificamente por arquivos com final .jpg ou .png ou .jpeg, assim como é feito com .pdf
    content = content.replace(/!\[\[(.*?)\]\]/g, `![](${baseUrl}$1)`);

    return content
  };

  // Fetching the content markdown file
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
      .then((text) => setMarkdownContent(treatMarkdownContent(text)))
      .catch((error) => {
        console.error('We could not load the markdown file:', error);
      });
    } else {
      setMarkdownContent(null);
    }
  }, [selectedLesson]); 

  // TODO - Consertar o content que tá ficando atrás de header quando o tamanho da tela diminui lateralmente.

  // Caso ainda não haja nada selecionado...
  if (selectedLesson==null) {
    return <main className="content">Selecione uma aula no menu lateral</main>;
  }

  return (
    <main className="content">

      <h1 
        className="classTitle"
      >
        {planoDeAulas[selectedLesson].titulo}
      </h1>
      
      <ReactMarkdown 
        remarkPlugins={[remarkMath]} 
        rehypePlugins={[rehypeKatex, rehypeRaw]}
      >
          {markdownContent}
      </ReactMarkdown>

    </main>
  );
  }

  export default Content
