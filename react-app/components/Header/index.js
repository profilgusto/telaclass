import styles from  './style.module.css';

const Header = ( {disciplinaNome, 
                  disciplinaCodigo, 
                  disciplinaSemestre,
                  disciplinaAno,
                  professorNome,
                  professorEmail
                } ) => {
    return (
      <header className={styles.header}>


        <div className={styles.boxLeft}>
          <img src="/assets/logo-ufsj.svg" alt="logo ufsj" className={styles.logoUfsj} />
        </div>

        <div  className={styles.boxCenter}>
          <h1>{disciplinaCodigo} - {disciplinaNome} - {disciplinaAno}/{disciplinaSemestre}</h1>
          <h2>Prof. {professorNome} - {professorEmail}</h2>
        </div>

        <div className={styles.boxRight}>
          <img src="/assets/logo-detem.svg" alt="logo ufsj" className={styles.logoCap} />
        </div>


      </header>
    );
  }


  
  export default Header