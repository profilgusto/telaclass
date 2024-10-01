import React, { useState, useEffect } from 'react';
import yaml from 'js-yaml';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Content from './components/Content';

import './App.css';

// PARAMETERS
const APP_URL = 'http://localhost:3000';
const CONTENT_URL = '/content-telaclass';

// MAIN FUNCTION
function App() {

  const [courseMetadata, setCourseMetadata] = useState(null);
  const [loadingYaml, setLoadingYaml] = useState(true);

  // TODO - Definir o selectedLesson com o 'null' inicialmente
  const [selectedLesson, setSelectedLesson] = useState(1);

  // Load do Disciplina YAML file 
  useEffect( () => {
    fetch(`${CONTENT_URL}/_disciplina.yaml`)
      .then( (response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then( (text) => {
        if (!text) {
          throw new Error('The YAML file is empty or with broken characters.');
        }
        const data = yaml.load(text);
        setCourseMetadata(data);
        setLoadingYaml(false);

      })
      .catch( (error) => {
        console.error('We could not load the YAML file: Error message is:', error);
      });
  }, []);

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

export default App;
