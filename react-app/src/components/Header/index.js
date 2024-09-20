import './style.css';

const Header = ( {disciplinaNome, disciplinaCodigo} ) => {
    return (
      <header className="cabecalho">
        <h1>Disciplina: {disciplinaCodigo} - {disciplinaNome}</h1>
      </header>
    );
  }
  
  export default Header