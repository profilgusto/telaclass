import './style.css';

// TODO - Consertar o styles do header pois ele está ficando sobre o sidebar e content quando a largura do navegador diminui muito

const Header = ( {disciplinaNome, 
                  disciplinaCodigo, 
                  disciplinaSemestre,
                  disciplinaAno,
                  professorNome,
                  professorEmail
                } ) => {
    return (
      <header className="cabecalho">
        <h1>{disciplinaCodigo} - {disciplinaNome} - {disciplinaAno}/{disciplinaSemestre}</h1>
        <h2>Prof. {professorNome} - {professorEmail}</h2>
      </header>
    );
  }


  
  export default Header