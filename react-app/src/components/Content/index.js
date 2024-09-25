import React, { useState, useEffect } from 'react';

import { MDXProvider } from '@mdx-js/react';
import { compile } from '@mdx-js/react';
import { run } from '@mdx-js/mdx'

import MDXRenderer from '../MdxRenderer';

// Deleteme plzzz
import MyMDXContent from './test.mdx';

// Import styles
import './style.css'

// PARAMETERS
const ATTACHMENTS_PATH = '_assets/';

const Content = ({ planoDeAulas, selectedLesson, content_url }) => {

  // Defining states
  const [mdxContent, setMdxContent] = useState(null);

  useEffect(() => {
    const fetchMdx = async () => {
      try {
        const response = await fetch('http://localhost:3001/01_introducao.mdx');
        const data = await response.text();
        setMdxContent(data);
      } catch (error) {
        console.error('Error fetching the MDX file:', error);
      }
    };
    fetchMdx();
  }, []);

  //console.log(mdxContent);


  
  // Defining functions
  /*
  const treatMarkdownContent = (content) => {
    const baseUrl = content_url+ATTACHMENTS_PATH;

    // Treating PDF files
    // TODO - Tratar também quando .PDF está em maiúsculo
    content = content.replace(/!\[\[(.*?)\.pdf\]\]/g, `<embed src="${baseUrl}$1.pdf" width="600" height="500" type="application/pdf">`);
    
    // Treating images
    // TODO - Pesquisar especificamente por arquivos com final .jpg ou .png ou .jpeg, assim como é feito com .pdf
    content = content.replace(/!\[\[(.*?)\]\]/g, `![](${baseUrl}$1)`);

    return content
  }; */

  // Fetching the content markdown file
  /*
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

  */

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

      
      
      <MDXProvider>
        <MyMDXContent />
      </MDXProvider>
      

      <h1>======OOOOO</h1>

      <MDXRenderer mdxContent={mdxContent} />

      {/* 

      <MDXProvider>
      <div>
        {mdxContent ? (
          <div>{mdx(mdxContent)}</div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </MDXProvider>

    */}

      

    </main>
  );
  }

  export default Content
