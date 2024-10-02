import React, { useState, useEffect } from 'react';
import yaml, { load } from 'js-yaml';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';

// PARAMETERS
const CONTENT_URL = '/content-telaclass';
const NEXT_PUBLIC_BASE_URL = 'http://localhost:3000';

// MAIN FUNCTION
function Home({courseMetadata, loadingYaml}) {
  const [selectedLesson, setSelectedLesson] = useState(0);

  // Loading screen
  if (loadingYaml) {
    return (
      <div className="App">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div >
      <Header
        disciplinaNome={courseMetadata?.disciplina.nome}
        disciplinaCodigo={courseMetadata?.disciplina.codigo}
        disciplinaAno={courseMetadata?.disciplina.ano}
        disciplinaSemestre={courseMetadata?.disciplina.semestre}
        professorNome={courseMetadata?.professor.nome}
        professorEmail={courseMetadata?.professor.email}
      />

      <Sidebar
        planoDeAulas={courseMetadata?.disciplina.planoDeAulas} 
        onSelectLesson={setSelectedLesson} 
        selectedLesson={selectedLesson}
      />    

      <Content
        planoDeAulas={courseMetadata?.disciplina.planoDeAulas} 
        selectedLesson={selectedLesson} 
        content_url={CONTENT_URL} 
      />
    </div>
  );
}

  // Método para o fetch de arquivos de forma estática no Next
  export async function getStaticProps() {
    let flagLoadingYaml = true;
    let data = null;

    const disciplinaYamlPath = `${NEXT_PUBLIC_BASE_URL}${CONTENT_URL}/_disciplina.yaml`;
    
    try {
      const response = await fetch(disciplinaYamlPath);

      if (!response.ok) {
        throw new Error('Network response was not ok when loading _disciplina.yaml.');
      }

      const text = await response.text();
      if (!text) {
        throw new Error('There was a problem when converting to text the fetched disciplina.yaml. The YAML file is empty or with broken characters (or something else).');
      }

      data = yaml.load(text);
      flagLoadingYaml = false;
    } catch (error) {
      console.error('We could not load the disciplina YAML file: Error message is:', error);
    }

    return {
      props: {
        courseMetadata: data,
        loadingYaml: flagLoadingYaml,
      },
    };
  }

export default Home;
