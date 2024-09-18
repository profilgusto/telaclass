import './style.css';

const Header = ( {cursoNome} ) => {
    return (
      <header className="cabecalho">
        <h1>Disciplina: {cursoNome}</h1>
      </header>
    );
  }
  
  export default Header