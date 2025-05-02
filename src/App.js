import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Cadastro from "./pages/cadastro/cadastro";
import Feed from "./pages/feed/feed"
import Perfil from "./pages/profile/profile";
import EditarPerfil from "./pages/profile/editar";
import Deslogar from "./pages/logout/logout";
import AdminHome from "./pages/admin/admin";
import AdminLogs from "./pages/admin/verLogs";

function App() {
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
      </Routes>
    </Router>
  );
}

export default App;
