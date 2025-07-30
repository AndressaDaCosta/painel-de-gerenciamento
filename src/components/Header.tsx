import { Search, Bell, Menu } from 'lucide-react'
import { motion } from 'framer-motion'

interface HeaderProps {
  onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-content">
        <button className="menu-toggle" onClick={onMenuClick}>
          <Menu size={24} />
        </button>

        <div className="header-search">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Buscar posts, categorias..." 
            className="search-input"
          />
        </div>

        <div className="header-actions">
          <motion.button 
            className="header-notification"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </motion.button>

          <div className="header-user">
            <img 
              src="https://ui-avatars.com/api/?name=Admin+User&background=3b82f6&color=fff" 
              alt="User" 
              className="header-avatar"
            />
          </div>
        </div>
      </div>
    </header>
  )
}