import React, { useState } from 'react';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';

// PARAMETERS
const CONTENT_URL = '/content-telaclass';

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

    try {
      // load yaml file
      const disciplinaYamlPath = path.join(process.cwd(), 'public', CONTENT_URL, '_disciplina.yaml');
      const fileContents = fs.readFileSync(disciplinaYamlPath, 'utf8');

      // parse its content
      data = yaml.load(fileContents);
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
