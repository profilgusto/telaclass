import React, { useState, useEffect } from 'react';
import MDXRenderer from '../MdxRenderer';
import SlidesRenderer from '../SlidesRenderer';

// Import styles
import styles from './style.module.css';

// CONSTANTS
const FETCH_SUCCESS = 200;
const FETCH_NOT_FOUND = 404;


const Content = ({ modulos, selectedLesson, content_url: contentUrl, isPresentationMode, onPresentationMode }) => {

  // Defining states
  const [mdxContentText, setMdxContentText] = useState(null);
  const [mdxContentSlides, setMdxContentSlides] = useState(null);

  // Fetching the text MDX file
  useEffect(() => {
    const fetchMdxContent = async () => {
      if (selectedLesson != null && modulos[selectedLesson]) {

        // mounting the path to the class resources
        const path_to_modulo = contentUrl + modulos[selectedLesson].path ;


        // TODO tratar o fetch, pois não quero que ele gere uma mensagem de erro no console quando o arquivo não for encontrado
        // Tratando do arquivo MDX do texto
        let responseTexto;
        try {
          responseTexto = await fetch(path_to_modulo + '/texto.mdx');
          if (responseTexto.status == FETCH_SUCCESS) {
            const dataTexto = fixMdx(await responseTexto.text(), path_to_modulo);
            setMdxContentText(dataTexto);
          }
        } catch (error) {
          // TODO Este erro nunca está sendo chamado, pelo menos não quando o arquivo não é encontrado (404)
          console.error(`Erro ao fetchar o arquivo .mdx de texto. Error message: ${error}`);
          throw error; // Re-throw the error to be caught by the outer catch
        }

        // Tratando do arquivo MDX dos slides
        let responseSlides;
        try {
          responseSlides = await fetch(path_to_modulo + '/slide.mdx');
          if (responseSlides.status == FETCH_SUCCESS) {
            const dataSlides = fixMdx(await responseSlides.text(), path_to_modulo);
            setMdxContentSlides(dataSlides);
          }

        } catch (error) {
          // TODO Este erro nunca está sendo chamado, pelo menos não quando o arquivo não é encontrado (404)
          console.error(`Erro ao fetchar o arquivo .mdx dos slides. Error message: ${error}`);
          throw error; // Re-throw the error to be caught by the outer catch
        }
      }
    };
    fetchMdxContent();
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
        <h1>{modulos[selectedLesson].titulo}</h1>
      </div>

      {/*
      {mdxContentSlides && (
        <div className={styles.classSlides}>
          <MDXRenderer mdxContent={mdxContentSlides} />
        </div>
      )}
      */}

      {mdxContentSlides && (
        <SlidesRenderer 
          mdxContentSlides={mdxContentSlides} 
          isPresentationMode={isPresentationMode}
          onPresentationMode={onPresentationMode}
        />
      )}

      {mdxContentText && (
        <div className={styles.classContent}>
          <MDXRenderer mdxContent={mdxContentText} />
        </div>    
      )}

      { !mdxContentSlides && !mdxContentText && (
        <div className={styles.classContent}>
          <p>Ainda não há conteúdo cadastrado para este módulo.</p>
        </div>
      )}


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