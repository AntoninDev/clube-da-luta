import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/api"; 
import './cadastro.css';

const Cadastro = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const estaLogado = localStorage.getItem("usuario_logado") === "true";
    if (estaLogado) {
      navigate("/profile");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    nome_completo: "",
    nome_usuario: "",
    email: "",
    data_nascimento: "",
    password: "" 
  });

  const [mensagemErro, setMensagemErro] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(formData);
      setMensagemErro("");
      setMensagemSucesso("Conta criada com sucesso! Você será redirecionado...");
      
      setTimeout(() => {
        navigate('/'); 
      }, 2000);
    } catch (error) {
      setMensagemSucesso(""); 
      setMensagemErro(error.message || "Erro ao registrar usuário.");
    }
  };

  const handleTogglePassword = (e) => {
    e.preventDefault(); 
    setMostrarSenha(prev => !prev);
  };

  return (
    <div className="container">
      <h1>Clube da Luta</h1>
      <form onSubmit={handleSubmit} autoComplete="off">
        <label htmlFor="nome_completo">Nome completo</label>
        <input
          type="text"
          id="nome_completo"
          name="nome_completo"
          value={formData.nome_completo}
          onChange={handleChange}
          required
          autoComplete="off"
        />

        <label htmlFor="nome_usuario">Nome de usuário</label>
        <input
          type="text"
          id="nome_usuario"
          name="nome_usuario"
          value={formData.nome_usuario}
          onChange={handleChange}
          required
          autoComplete="off"
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="off"
        />

        <label htmlFor="data_nascimento">Data de nascimento</label>
        <input
          type="date"
          id="data_nascimento"
          name="data_nascimento"
          value={formData.data_nascimento}
          onChange={handleChange}
          required
          autoComplete="off"
        />

        <label htmlFor="password">Senha</label> 
        <div className="senha-container">
          <input
            type={mostrarSenha ? "text" : "password"}
            id="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
          <span
            className="toggle-password"
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleTogglePassword}
            style={{ userSelect: 'none', cursor: 'pointer' }} 
          >
            {mostrarSenha ? '🙈' : '👁️'}
          </span>
        </div>

        <button type="submit">Cadastrar</button>
        {mensagemSucesso && <div className="mensagem-sucesso">{mensagemSucesso}</div>}
        {mensagemErro && <div className="mensagem-erro">{mensagemErro}</div>}

        <div className="link">
          Já tem uma conta? <a href="/">Faça login</a>
        </div>
      </form>
    </div>
  );
};

export default Cadastro;
