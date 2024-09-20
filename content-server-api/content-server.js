// ====> PARAMETERS
const _pathToObsidianVault = '/app/obsidian-content';
const _pathToDisciplinaYaml = '/app/obsidian-content/_disciplina.yaml';
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
const contentPath = path.resolve(_pathToObsidianVault);
appExpress.use('/', express.static(contentPath));

// treating the YAML file of the discipline
appExpress.get('/disciplina.yaml', (req, res) => {
  res.sendFile(_pathToDisciplinaYaml);
});



appExpress.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
