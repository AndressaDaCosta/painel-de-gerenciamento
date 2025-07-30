import { Tag } from 'lucide-react'
import { motion } from 'framer-motion'

interface Post {
  id: string
  title: string
  description: string
  imageUrl: string
  publishDate: string
  category: string
  createdAt: string
}

interface CategoryCounterProps {
  posts: Post[]
}

export function CategoryCounter({ posts }: CategoryCounterProps) {
  const getCategoryCounts = () => {
    const counts: Record<string, number> = {
      'artigo': 0,
      'noticia': 0,
      'tutorial': 0,
      'entrevista': 0
    }
    
    posts.forEach(post => {
      if (counts[post.category] !== undefined) {
        counts[post.category]++
      }
    })
    
    return counts
  }

  const categoryLabels: Record<string, string> = {
    'artigo': 'Artigos',
    'noticia': 'Notícias',
    'tutorial': 'Tutoriais',
    'entrevista': 'Entrevistas'
  }

  const categoryColors: Record<string, string> = {
    'artigo': 'blue',
    'noticia': 'green',
    'tutorial': 'purple',
    'entrevista': 'orange'
  }

  const counts = getCategoryCounts()

  return (
    <div className="category-counter">
      <h3 className="counter-title">Posts por Categoria</h3>
      <div className="counter-grid">
        {Object.entries(counts).map(([category, count], index) => (
          <motion.div
            key={category}
            className={`counter-card counter-${categoryColors[category]}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="counter-icon">
              <Tag size={20} />
            </div>
            <div className="counter-content">
              <span className="counter-value">{count}</span>
              <span className="counter-label">{categoryLabels[category]}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}