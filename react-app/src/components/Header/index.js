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
      <header className="header">


        <div className="box-left">
          <img src="/assets/logo-ufsj.svg" alt="logo ufsj" className="logo-ufsj" />
        </div>

        <div  className="box-center">
          <h1>{disciplinaCodigo} - {disciplinaNome} - {disciplinaAno}/{disciplinaSemestre}</h1>
          <h2>Prof. {professorNome} - {professorEmail}</h2>
        </div>

        <div className="box-right">
          <img src="/assets/logo-detem.svg" alt="logo ufsj" className="logo-ufsj" />
        </div>


      </header>
    );
  }


  
  export default Header