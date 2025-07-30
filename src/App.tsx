import { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { PlusCircle, FileText } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'
import { Dashboard } from './components/Dashboard'
import { PostCard } from './components/PostCard'
import { CategoryCounter } from './components/CategoryCounter'

interface Post {
  id: string
  title: string
  description: string
  imageUrl: string
  publishDate: string
  category: string
  createdAt: string
}

type View = 'dashboard' | 'form' | 'posts' | 'analytics' | 'users' | 'settings'

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [publishDate, setPublishDate] = useState('')
  const [category, setCategory] = useState('')
  const [posts, setPosts] = useState<Post[]>([])

  const categories = [
    { value: '', label: 'Selecione uma categoria' },
    { value: 'artigo', label: 'Artigo' },
    { value: 'noticia', label: 'Notícia' },
    { value: 'tutorial', label: 'Tutorial' },
    { value: 'entrevista', label: 'Entrevista' }
  ]

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = () => {
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]')
    // Converte posts antigos para o novo formato se necessário
    const normalizedPosts = savedPosts.map((post: any) => ({
      id: post.id || Date.now().toString() + Math.random(),
      title: post.title || post.titulo,
      description: post.description || post.descricao,
      imageUrl: post.imageUrl || post.capa,
      publishDate: post.publishDate || post.data,
      category: post.category || post.tipo?.toLowerCase() || 'artigo',
      createdAt: post.createdAt || new Date().toISOString()
    }))
    setPosts(normalizedPosts)
  }

  const validateForm = (): boolean => {
    if (!title.trim()) {
      toast.error('O título é obrigatório!')
      return false
    }

    if (!description.trim()) {
      toast.error('A descrição é obrigatória!')
      return false
    }

    if (!imageUrl.trim()) {
      toast.error('A URL da imagem é obrigatória!')
      return false
    }

    if (!imageUrl.startsWith('http')) {
      toast.error('A URL da imagem deve começar com http!')
      return false
    }

    if (!publishDate) {
      toast.error('A data de publicação é obrigatória!')
      return false
    }

    const selectedDate = new Date(publishDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (selectedDate < today) {
      toast.error('A data de publicação deve ser no presente ou futuro!')
      return false
    }

    if (!category) {
      toast.error('A categoria é obrigatória!')
      return false
    }

    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const newPost: Post = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      publishDate,
      category,
      createdAt: new Date().toISOString()
    }

    const updatedPosts = [...posts, newPost]
    
    localStorage.setItem('posts', JSON.stringify(updatedPosts))
    setPosts(updatedPosts)
    
    setTitle('')
    setDescription('')
    setImageUrl('')
    setPublishDate('')
    setCategory('')
    
    toast.success('Post criado com sucesso!')
  }

  const deletePost = (id: string) => {
    const updatedPosts = posts.filter(post => post.id !== id)
    localStorage.setItem('posts', JSON.stringify(updatedPosts))
    setPosts(updatedPosts)
    toast.success('Post removido com sucesso!')
  }

  return (
    <div className="app">
      <Sidebar 
        currentView={currentView}
        setCurrentView={setCurrentView}
        postsCount={posts.length}
      />
      
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="main-content">
        <AnimatePresence mode="wait">
          {currentView === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Dashboard posts={posts} />
            </motion.div>
          )}

          {currentView === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="content-section"
            >
              <div className="page-header">
                <h1>Criar Novo Post</h1>
                <p>Preencha os campos abaixo para criar um novo post</p>
              </div>

              <div className="form-container">
                <form onSubmit={handleSubmit} className="form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="title">Título do Post</label>
                      <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Digite o título do post"
                        className="input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Descrição</label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Digite a descrição do post"
                      className="textarea"
                      rows={4}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="imageUrl">URL da Imagem de Capa</label>
                    <input
                      type="url"
                      id="imageUrl"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://exemplo.com/imagem.jpg"
                      className="input"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="publishDate">Data de Publicação</label>
                      <input
                        type="date"
                        id="publishDate"
                        value={publishDate}
                        onChange={(e) => setPublishDate(e.target.value)}
                        className="input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="category">Categoria</label>
                      <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="select"
                      >
                        {categories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="submit-button">
                    <PlusCircle size={20} />
                    Criar Post
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {currentView === 'posts' && (
            <motion.div
              key="posts"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="content-section"
            >
              <div className="page-header">
                <h1>Posts Criados</h1>
                <p>Gerencie todos os seus posts criados</p>
              </div>

              {posts.length > 0 && <CategoryCounter posts={posts} />}
              
              <div className="posts-container">
                {posts.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">
                      <FileText size={80} />
                    </div>
                    <h3>Nenhum post encontrado</h3>
                    <p>Você ainda não criou nenhum post. Clique em "Criar Post" para começar.</p>
                    <button 
                      className="create-post-btn"
                      onClick={() => setCurrentView('form')}
                    >
                      <PlusCircle size={20} />
                      Criar Primeiro Post
                    </button>
                  </div>
                ) : (
                  <div className="posts-grid">
                    {posts.map((post, index) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        onDelete={deletePost}
                        index={index}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {currentView === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="content-section"
            >
              <div className="page-header">
                <h1>Analytics</h1>
                <p>Análise detalhada do desempenho do seu conteúdo</p>
              </div>
              <div className="empty-state">
                <h3>Em breve</h3>
                <p>Esta funcionalidade estará disponível em breve.</p>
              </div>
            </motion.div>
          )}

          {currentView === 'users' && (
            <motion.div
              key="users"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="content-section"
            >
              <div className="page-header">
                <h1>Usuários</h1>
                <p>Gerencie os usuários do sistema</p>
              </div>
              <div className="empty-state">
                <h3>Em breve</h3>
                <p>Esta funcionalidade estará disponível em breve.</p>
              </div>
            </motion.div>
          )}

          {currentView === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="content-section"
            >
              <div className="page-header">
                <h1>Configurações</h1>
                <p>Personalize as configurações do sistema</p>
              </div>
              <div className="empty-state">
                <h3>Em breve</h3>
                <p>Esta funcionalidade estará disponível em breve.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default App