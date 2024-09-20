import './style.css'

const Sidebar = ( {planoDeAulas, onSelectLesson} ) => {
    return (
      <aside className="sidebar">
        <h2>Conteúdo</h2>      
        <ul>
          {planoDeAulas.map((aula, index) => (
            <li key={index}>
              <button onClick={() => onSelectLesson(index)} >{aula.titulo}</button>
            </li>
          ))}
        </ul>
      </aside>
    );
  }

  export default Sidebar