import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// // Adiciona posts de exemplo 
// const currentPosts = localStorage.getItem('posts')
// if (!currentPosts || JSON.parse(currentPosts).length === 0) {
//   const posts = [
//     {
//       id: 1,
//       titulo: "Inteligência Artificial no Dia a Dia",
//       descricao:
//         "Como a IA está revolucionando serviços e impactando decisões em empresas e governos.",
//       capa: "https://totalip.com.br/wp-content/uploads/2023/08/A-tecnologia-impulsiona-o-futuro-do-Brasil.png",
//       data: "2025-07-15",
//       tipo: "Artigo",
//     },
//     {
//       id: 2,
//       titulo: "5 Tendências Tech para 2026",
//       descricao:
//         "De computação quântica ao metaverso corporativo, conheça o que vem por aí.",
//       capa: "https://totalip.com.br/wp-content/uploads/2023/08/A-tecnologia-impulsiona-o-futuro-do-Brasil.png",
//       data: "2025-07-10",
//       tipo: "Notícia",
//     }
//   ]
  
//   localStorage.setItem("posts", JSON.stringify(posts))
// }

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
