import React, { useState, useEffect } from 'react';

import MDXRenderer from '../MdxRenderer';

// Import styles
import styles from './style.module.css';


const Content = ({ modulos, selectedLesson, content_url: contentUrl }) => {


  // Defining states
  const [mdxContentText, setMdxContentText] = useState(null);

  // Fetching the text MDX file
  useEffect(() => {
    const fetchContentTextMdx = async () => {
      if (selectedLesson != null && modulos[selectedLesson]) {
        try {
          const path_to_modulo = contentUrl + modulos[selectedLesson].path ;
          const response = await fetch(path_to_modulo + '/texto.mdx');
          const data = fixMdx(await response.text(), path_to_modulo);
          setMdxContentText(data);
        } catch (error) {
          console.error('Error fetching the MDX file:', error);
          setMdxContentText('Erro ao carregar o arquivo .mdx [2]');
        }  
      } else {
        setMdxContentText("Problema ao carregar o arquivo .mdx [1]");
      }
    };
    fetchContentTextMdx();
  }, [selectedLesson]);


  // Caso ainda não haja nada selecionado...
  if (selectedLesson==null) {
    return (
      <div className={styles.mainDiv}>
        <h1>Selecione uma aula no menu lateral</h1>
      </div>
    );
  }

  // TODO Adicionar agora a div dos slides de maneira condicional, caso haja

  // TODO Renderizar também o conteúdo de forma condicional, caso haja o arquivo texto.mdx

  return (
    <div className={styles.mainDiv}>

      <div className={styles.classTitle}>
        <h1>{modulos[selectedLesson].titulo}</h1>
      </div>

      <div className={styles.classContent}>
        <MDXRenderer mdxContent={mdxContentText} />
      </div>    

    </div>
  );
}
export default Content


  /* SUPPORT FUNCTIONS */
const fixMdx = (data, contentBaseUrl) => {
  // Fixes things in the MDX raw file

  // TODO Pensar numa melhor maneira de modificar o path das imagens pô

  // Fixing the images path to URI, replacing relative local path `./` to the public folder `/` path in React app
  data = data.replace(/\!\[img\]\(/g, `![img](`+ contentBaseUrl+`/img/`);

  return data;
}