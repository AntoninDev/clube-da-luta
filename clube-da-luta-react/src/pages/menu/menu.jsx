import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './menu.css';

function Menu() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobile ? 'mobile' : ''}`}>
      <div className="sidebar-header">
        <button className="toggle-btn" onClick={toggleMenu}>
          ☰
        </button>
      </div>

      {!isCollapsed && (
        <nav className="nav-links">
          <Link to="/feed" className="nav-item">📰 {!isMobile && <span className="nav-label">Feed</span>}</Link>
          <Link to="/search" className="nav-item">🔍 {!isMobile && <span className="nav-label">Pesquisar</span>}</Link>
          <Link to="/ranking" className="nav-item">👑 {!isMobile && <span className="nav-label">Ranking</span>}</Link>
          <Link to="/avisos" className="nav-item">🔔 {!isMobile && <span className="nav-label">Avisos</span>}</Link>
          <Link to="/global_chat" className="nav-item">💬 {!isMobile && <span className="nav-label">Chat Global</span>}</Link>
          <Link to="/training" className="nav-item">🥊 {!isMobile && <span className="nav-label">Treinos</span>}</Link>
          <Link to="/locais" className="nav-item">📍 {!isMobile && <span className="nav-label">Locais</span>}</Link>
          <Link to="/rules" className="nav-item">📜 {!isMobile && <span className="nav-label">Regras</span>}</Link>

          <div className="nav-bottom">
            <Link to="/profile" className="nav-item">👤 {!isMobile && <span className="nav-label">Perfil</span>}</Link>
            <Link to="/logout" className="nav-item">🚪 {!isMobile && <span className="nav-label">Sair</span>}</Link>
          </div>
        </nav>
      )}
    </aside>
  );
}

export default Menu;
