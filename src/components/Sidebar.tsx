import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  Users, 
  BarChart,
  PlusCircle,
  Grid,
  LogOut
} from 'lucide-react'
import { motion } from 'framer-motion'

interface SidebarProps {
  currentView: string
  setCurrentView: (view: any) => void
  postsCount: number
}

export function Sidebar({ currentView, setCurrentView, postsCount }: SidebarProps) {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'form',
      label: 'Criar Post',
      icon: PlusCircle,
      badge: null
    },
    {
      id: 'posts',
      label: 'Posts',
      icon: Grid,
      badge: postsCount
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart,
      badge: null
    },
    {
      id: 'users',
      label: 'Usuários',
      icon: Users,
      badge: null
    },
    {
      id: 'settings',
      label: 'Configurações',
      icon: Settings,
      badge: null
    }
  ]

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <FileText className="logo-icon" />
          <h2>ContentHub</h2>
        </div>
        <div className="user-info">
          <div className="user-avatar">
            <img src="https://ui-avatars.com/api/?name=Admin+User&background=3b82f6&color=fff" alt="User" />
          </div>
          <div className="user-details">
            <span className="user-name">Admin User</span>
            <span className="user-role">Administrador</span>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <span className="nav-section-title">Menu Principal</span>
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = currentView === item.id
            
            return (
              <motion.button
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setCurrentView(item.id)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon size={20} />
                <span className="nav-label">{item.label}</span>
                {item.badge !== null && (
                  <span className="nav-badge">{item.badge}</span>
                )}
              </motion.button>
            )
          })}
        </div>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn">
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </div>
    </div>
  )
}