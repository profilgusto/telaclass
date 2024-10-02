import React, { useState, useEffect } from 'react';

import MDXRenderer from '../MdxRenderer';

// Import styles
import styles from './style.module.css';


/* SUPPORT FUNCTIONS */
const fixMdx = (data, contentBaseUrl) => {
  // Fixes things in the MDX raw file

  // Fixing the images path to URI, replacing relative local path `./` to the public folder `/` path in React app
  data = data.replace(/\.\//g, contentBaseUrl+`/`);

  return data;
}

const Content = ({ planoDeAulas, selectedLesson, content_url }) => {

  // Defining states
  const [mdxContent, setMdxContent] = useState(null);

  // Fetching the MDX file
  useEffect(() => {
    const fetchMdx = async () => {
      if (selectedLesson != null && planoDeAulas[selectedLesson]) {
        try {
          const pathToMdxResource = content_url+'/' + planoDeAulas[selectedLesson].path;
          const response = await fetch(pathToMdxResource);
          const data = fixMdx(await response.text(), content_url);
          setMdxContent(data);
        } catch (error) {
          console.error('Error fetching the MDX file:', error);
          setMdxContent('Erro ao carregar o arquivo .mdx [2]')
        }  
      } else {
        setMdxContent("Problema ao carregar o arquivo .mdx [1]");
      }
    };
    fetchMdx();
  }, [selectedLesson]);


  // Caso ainda não haja nada selecionado...
  if (selectedLesson==null) {
    return (
      <div className={styles.mainDiv}>
        <h1>Selecione uma aula no menu lateral</h1>
      </div>
    );
  }

  return (
    <div className={styles.mainDiv}>

      <div className={styles.classTitle}>
        <h1>{planoDeAulas[selectedLesson].titulo}</h1>
      </div>

      <div className={styles.classContent}>
        <MDXRenderer mdxContent={mdxContent} />
      </div>    

    </div>
  );
  }

  export default Content