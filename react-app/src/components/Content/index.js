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

  // Fetching the MDX file
  useEffect(() => {
    const fetchMdx = async () => {
      try {
        // TODO - Usar o seletor de aula para dar fetch no arquivo correto de aula
        const response = await fetch('http://localhost:3001/01_introducao.mdx');
        const data = await response.text();
        setMdxContent(data);
      } catch (error) {
        console.error('Error fetching the MDX file:', error);
      }
    };
    fetchMdx();
  }, []);

  // TODO - Tratar no mdx importado as figuras e etc

  // Caso ainda não haja nada selecionado...
  if (selectedLesson==null) {
    return <main className="content">Selecione uma aula no menu lateral</main>;
  }

  return (
    <main className="content">

      <h1 className="classTitle">
        {planoDeAulas[selectedLesson].titulo}
      </h1>

      <MDXRenderer mdxContent={mdxContent} />    

    </main>
  );
  }

  export default Content
