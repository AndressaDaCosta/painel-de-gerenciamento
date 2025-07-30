import { Calendar, Tag, Trash2, Edit, Eye, MoreVertical } from 'lucide-react'
import { motion } from 'framer-motion'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

interface PostCardProps {
  post: {
    id: string
    title: string
    description: string
    imageUrl: string
    publishDate: string
    category: string
    createdAt: string
  }
  onDelete: (id: string) => void
  index: number
}

export function PostCard({ post, onDelete, index }: PostCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'artigo': 'blue',
      'noticia': 'green',
      'tutorial': 'purple',
      'entrevista': 'orange'
    }
    return colors[category] || 'gray'
  }

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      'artigo': 'Artigo',
      'noticia': 'Notícia',
      'tutorial': 'Tutorial',
      'entrevista': 'Entrevista'
    }
    return labels[category] || category
  }

  return (
    <motion.div
      className="post-card-modern"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <div className="post-card-image">
        <img src={post.imageUrl} alt={post.title} />
        <div className={`post-card-category category-${getCategoryColor(post.category)}`}>
          <Tag size={14} />
          <span>{getCategoryLabel(post.category)}</span>
        </div>
      </div>

      <div className="post-card-content">
        <div className="post-card-header">
          <h3 className="post-card-title">{post.title}</h3>
          
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="post-card-menu">
                <MoreVertical size={20} />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content className="dropdown-content" sideOffset={5}>
                <DropdownMenu.Item className="dropdown-item">
                  <Eye size={16} />
                  <span>Visualizar</span>
                </DropdownMenu.Item>
                
                <DropdownMenu.Item className="dropdown-item">
                  <Edit size={16} />
                  <span>Editar</span>
                </DropdownMenu.Item>
                
                <DropdownMenu.Separator className="dropdown-separator" />
                
                <DropdownMenu.Item 
                  className="dropdown-item dropdown-item-danger"
                  onSelect={() => onDelete(post.id)}
                >
                  <Trash2 size={16} />
                  <span>Excluir</span>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>

        <p className="post-card-description">{post.description}</p>

        <div className="post-card-footer">
          <div className="post-card-date">
            <Calendar size={16} />
            <span>{formatDate(post.publishDate)}</span>
          </div>
          
          <div className="post-card-stats">
            <div className="post-stat">
              <Eye size={16} />
              <span>1,234</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}