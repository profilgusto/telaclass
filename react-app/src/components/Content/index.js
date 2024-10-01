import React, { useState, useEffect } from 'react';

import MDXRenderer from '../MdxRenderer';

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
      if (selectedLesson != null && planoDeAulas[selectedLesson]) {
        try {
          const response = await fetch(content_url+'/' + planoDeAulas[selectedLesson].arquivo);
          const data = await response.text();
          setMdxContent(data);
        } catch (error) {
          console.error('Error fetching the MDX file:', error);
        }  
      } else {
        setMdxContent("Problema ao carregar o arquivo .mdx");
      }
    };
    fetchMdx();
  }, [selectedLesson]);


  // Caso ainda não haja nada selecionado...
  if (selectedLesson==null) {
    return <main className="content">Selecione uma aula no menu lateral</main>;
  }

  return (
    <div className="main-div">

      <div className="class-title">
        <h1>{planoDeAulas[selectedLesson].titulo}</h1>
      </div>

      <div className="class-content">
        <h1>Teste título 1</h1>
        <p>Mussum Ipsum, cacilds vidis litro abertis.  Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis. Bota 1 metro de cachacis aí pra viagem! Mé faiz elementum girarzis, nisi eros vermeio.</p>
        <h2>Teste título 1</h2>
        <p>Mussum Ipsum, cacilds vidis litro abertis.  Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis. Bota 1 metro de cachacis aí pra viagem! Mé faiz elementum girarzis, nisi eros vermeio.</p>
        <p>Mussum Ipsum, cacilds vidis litro abertis.  Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis. Bota 1 metro de cachacis aí pra viagem! Mé faiz elementum girarzis, nisi eros vermeio.</p>
      </div>

      {/* 

      <MDXRenderer mdxContent={mdxContent} />    

      */}

    </div>
  );




  }

  export default Content
