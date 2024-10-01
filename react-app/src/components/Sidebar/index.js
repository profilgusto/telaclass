import './style.css'

const Sidebar = ( {planoDeAulas, onSelectLesson, selectedLesson} ) => {
    return (
      <aside className="sidebar">
        <h1>Conteúdo</h1>      
        <ul>
          {planoDeAulas.map((aula, index) => (
            <li 
              key={index} 
              className={selectedLesson == index ? 'selected': ''}
            >
              <button 
                onClick={() => onSelectLesson(index)} 
                className={selectedLesson == index ? 'selected': ''}
              >
                {aula.titulo}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    );
  }

  export default Sidebar