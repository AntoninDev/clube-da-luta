import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Cadastro from "./pages/cadastro/cadastro";
import Feed from "./pages/feed/feed"
import Perfil from "./pages/profile/profile";
import EditarPerfil from "./pages/profile/editar";
import Deslogar from "./pages/logout/logout";
import AdminHome from "./pages/admin/admin";
import AdminLogs from "./pages/admin/verLogs";
import UsuariosOnline from "./pages/admin/info";
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const userId = localStorage.getItem('usuario_id');
    if (!userId) return;
  
    // Marcar como online ao abrir o site
    fetch(`http://localhost:4000/users/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, online: true }),
    });
  
    // Marcar como offline ao sair
    const handleUnload = () => {
      navigator.sendBeacon(`http://localhost:4000/users/status`, JSON.stringify({
        user_id: userId,
        online: false,
      }));
    };
  
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home-page" element={<Perfil />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Perfil />} />
        <Route path="/editar-perfil" element={<EditarPerfil />} />
        <Route path="/logout" element={<Deslogar />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/logs" element={<AdminLogs />} />
        <Route path="/admin/online" element={<UsuariosOnline />} />
      </Routes>
    </Router>
  );
}

export default App;
