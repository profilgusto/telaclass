import React, { useState, useEffect } from 'react';
import yaml from 'js-yaml';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Content from './components/Content';

import './App.css';

function App() {

  const [courseMetadata, setCourseMetadata] = useState(null);

  // Load a Disciplina YAML file 
  useEffect( () => {
    fetch('http://localhost:3001/disciplina.yaml')
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
      })
      .catch( (error) => {
        console.error('We could not load the YAML file:', error);
      });
  }, []);


  
  const [markdownContent, setMarkdownContent] = useState('');
  // loads the markdown file containing the class content
  /* useEffect(() => {
    fetch('/disciplina/aula-teoria.md')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((text) => setMarkdownContent(text))
      .catch((error) => {
        console.error('We could not load the markdown file:', error);
      });
  }, []); */

  return (
    <div className="App">
      <Header cursoNome={courseMetadata.curso.nome} />
      <div className="container">
        <Sidebar planoDeAula={courseMetadata.planoDeEstudos} />
        <Content markdownContent={markdownContent} />
      </div>
    </div>

  );
}

export default App;
