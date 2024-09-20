import React, { useState, useEffect } from 'react';
import yaml from 'js-yaml';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Content from './components/Content';

import './App.css';

// PARAMETERS
const CONTENT_URL = 'http://localhost:3001/';

// MAIN FUNCTION
function App() {

  const [courseMetadata, setCourseMetadata] = useState(null);
  const [loadingYaml, setLoadingYaml] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState(null);

  // Load do Disciplina YAML file 
  useEffect( () => {
    fetch(`${CONTENT_URL}disciplina.yaml`)
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


  // Debugging
  //console.log("CP1");
  //console.log(courseMetadata?.professor.nome);
  //console.log(loadingYaml);
  //console.log(selectedLesson)

  // Loading screen
  if (loadingYaml) {
    return (
      <div className="App">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="App">

      <Header disciplinaNome={courseMetadata?.disciplina.nome} disciplinaCodigo={courseMetadata?.disciplina.codigo} />

      <div className="container">
        <Sidebar 
          planoDeAulas={courseMetadata?.disciplina.planoDeAulas} 
          onSelectLesson={setSelectedLesson} 
        />

        <Content 
          planoDeAulas={courseMetadata?.disciplina.planoDeAulas} 
          selectedLesson={selectedLesson} 
          content_url={CONTENT_URL} 
        />
      </div>
      
    </div>

  );
}

export default App;