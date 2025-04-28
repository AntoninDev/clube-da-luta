import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./login.css";

function Login() {
  const navigate = useNavigate();

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mensagem, setMensagem] = useState("");

  // Verifica se o usuário já está logado
  useEffect(() => {
    const estaLogado = localStorage.getItem("usuario_logado") === "true";
    if (estaLogado) {
      navigate("/feed");
    }
  }, [navigate]);

  // Função de login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");

    try {
      const response = await fetch("http://192.168.0.111:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrUsername, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("usuario_info", JSON.stringify(data.user));
        localStorage.setItem("usuario_logado", "true");

        setMensagem("✅ Login bem-sucedido! Redirecionando...");
        setTimeout(() => navigate("/feed"), 1500);
      } else {
        setMensagem("❌ " + (data.error || "Erro ao fazer login."));
      }
    } catch (error) {
      setMensagem("❌ Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="login-container">
      <header>
        <h1>Clube da Luta</h1>
      </header>

      <main>
        <h2>Bem-vindo ao Clube</h2>
        <p>“A primeira regra do Clube da Luta é: Você não fala sobre o Clube da Luta.”</p>

        <form onSubmit={handleSubmit} id="loginForm">
          <h3>Login</h3>

          <label htmlFor="emailOrUsername">Usuário ou E-mail</label>
          <input
            type="text"
            id="emailOrUsername"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            required
          />

          <label htmlFor="password">Senha</label>
          <div className="senha-container">
            <input
              type={mostrarSenha ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setMostrarSenha(!mostrarSenha)}
            >
              {mostrarSenha ? "🙈" : "👁️"}
            </span>
          </div>

          <button id="btn_submit" type="submit">Entrar</button>
          <p>Não tem conta? <Link to="/cadastro">Cadastre-se</Link></p>
        </form>

        {mensagem && (
          <p className="mensagem-erro" style={{ marginTop: "1rem" }}>
            {mensagem}
          </p>
        )}

      </main>
    </div>
  );
}

export default Login;
