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
  const [isPresentationMode, setIsPresentationMode] = useState(false);

  // Loading screen
  if (loadingYaml) {
    return (
      <div className="App">
        <h1>Carregando a sua disciplina, aguarde...</h1>
        <p>Verifique se o arquivo disciplina.yaml está localizado na pasta do conteúdo.</p>
      </div>
    );
  }

  // TODO - ADd a 404 page

  // TODO Criar a paleta de cores e atualizar todos os css abaixo como variáveis

  return (
    <div >
      <Header
        disciplinaNome={courseMetadata?.disciplina.nome}
        disciplinaCodigo={courseMetadata?.disciplina.codigo}
        disciplinaAno={courseMetadata?.disciplina.ano}
        disciplinaSemestre={courseMetadata?.disciplina.semestre}
        professorNome={courseMetadata?.professor.nome}
        professorEmail={courseMetadata?.professor.email}
        isPresentationMode={isPresentationMode}
      />

      <Sidebar
        modulos={courseMetadata?.disciplina.modulos} 
        onSelectLesson={setSelectedLesson} 
        selectedLesson={selectedLesson}
        isPresentationMode={isPresentationMode}
      />  

      
      <Content
        modulos={courseMetadata?.disciplina.modulos} 
        selectedLesson={selectedLesson} 
        content_url={CONTENT_URL} 
        isPresentationMode={isPresentationMode}
        onPresentationMode={setIsPresentationMode}
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
      const disciplinaYamlPath = path.join(process.cwd(), 'public', CONTENT_URL, 'disciplina.yaml');
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
