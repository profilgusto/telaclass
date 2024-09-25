// ====> PARAMETERS
const _pathToContentTelaclass = '/app/content-telaclass';
const _pathToDisciplinaYaml = _pathToContentTelaclass+'/_disciplina.yaml';
const _port = 3001;
// ====> END OF PARAMETERS


const express = require('express');
const path = require('path');

const appExpress = express();
const PORT = _port;

// to allow calls from the same origin
const cors = require('cors');
appExpress.use(cors());

// letting available all of the discipline's content
const contentPath = path.resolve(_pathToContentTelaclass);
appExpress.use('/', express.static(contentPath));

// treating the YAML file of the discipline
appExpress.get('/disciplina.yaml', (req, res) => {
  res.sendFile(_pathToDisciplinaYaml);
});

// starting the server
appExpress.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
