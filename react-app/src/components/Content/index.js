import ReactMarkdown from 'react-markdown';

// For katex support on ReactMarkdown
import {createRoot} from 'react-dom/client'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

// Import styles
import './style.css'
import 'katex/dist/katex.min.css'

const Content = ({ markdownContent }) => {

  return (
    <main className="content">
      {/* Aqui você irá renderizar o conteúdo do Markdown */}
      <p>Nesta aula iremos ver TUDO DE BOOOM</p>
      {/* <ReactMarkdown>{markdownContent}</ReactMarkdown> */}
      
      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {markdownContent}
      </ReactMarkdown>

     
    </main>
  );
  }

  export default Content
