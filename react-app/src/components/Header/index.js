import './style.css';

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