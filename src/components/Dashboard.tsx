import { 
  TrendingUp, 
  Eye, 
  FileText, 
  Users,
  ArrowUp,
  ArrowDown
} from 'lucide-react'
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

interface DashboardProps {
  posts: Post[]
}

export function Dashboard({ posts }: DashboardProps) {
  const stats = [
    {
      title: 'Total de Posts',
      value: posts.length,
      icon: FileText,
      change: '+12%',
      changeType: 'increase' as const,
      color: 'blue'
    },
    {
      title: 'Visualizações',
      value: '12,345',
      icon: Eye,
      change: '+23%',
      changeType: 'increase' as const,
      color: 'green'
    },
    {
      title: 'Engajamento',
      value: '89%',
      icon: TrendingUp,
      change: '-2%',
      changeType: 'decrease' as const,
      color: 'purple'
    },
    {
      title: 'Novos Usuários',
      value: '245',
      icon: Users,
      change: '+18%',
      changeType: 'increase' as const,
      color: 'orange'
    }
  ]

  const getCategoryStats = () => {
    const categoryCount: Record<string, number> = {}
    posts.forEach(post => {
      categoryCount[post.category] = (categoryCount[post.category] || 0) + 1
    })
    return Object.entries(categoryCount)
  }

  const recentPosts = posts.slice(-5).reverse()

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Visão geral do seu conteúdo e performance</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              className={`stat-card stat-${stat.color}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="stat-header">
                <div className={`stat-icon icon-${stat.color}`}>
                  <Icon size={24} />
                </div>
                <div className={`stat-change ${stat.changeType}`}>
                  {stat.changeType === 'increase' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-title">{stat.title}</p>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="dashboard-grid">
        <motion.div 
          className="dashboard-card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="card-title">Posts por Categoria</h2>
          <div className="category-stats">
            {getCategoryStats().map(([category, count]) => (
              <div key={category} className="category-item">
                <div className="category-info">
                  <span className="category-name">{category || 'Sem categoria'}</span>
                  <span className="category-count">{count} posts</span>
                </div>
                <div className="category-bar">
                  <div 
                    className="category-bar-fill" 
                    style={{ width: `${(count / posts.length) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="dashboard-card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="card-title">Posts Recentes</h2>
          <div className="recent-posts">
            {recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <div key={post.id} className="recent-post-item">
                  <img src={post.imageUrl} alt={post.title} className="recent-post-image" />
                  <div className="recent-post-info">
                    <h4 className="recent-post-title">{post.title}</h4>
                    <p className="recent-post-date">
                      {new Date(post.publishDate).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-posts">Nenhum post criado ainda</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}