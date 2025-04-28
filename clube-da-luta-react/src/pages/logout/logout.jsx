import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Deslogar = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    const usuario = JSON.parse(localStorage.getItem("usuario_info"));
    const confirmar = window.confirm(
      `${usuario?.nome_usuario}, tem certeza que deseja sair da sua conta?`
    );

    if (confirmar) {
      localStorage.clear();
      navigate("/login"); // Redireciona para a página de login após o logout
    }
  };

  const handleCancel = () => {
    navigate(-1); // Volta para a página anterior
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Você está prestes a deslogar da sua conta.</h2>

      <button
        style={styles.logoutButton}
        onClick={handleLogout}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? "Saindo..." : "Deslogar 🩸"}
      </button>

      <button style={styles.cancelButton} onClick={handleCancel}>
        Cancelar ✖
      </button>
    </div>
  );
};

// Estilos em objeto para facilitar o uso no JSX
const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    fontFamily: "'Courier New', monospace",
  },
  title: {
    color: "darkred",
  },
  logoutButton: {
    backgroundColor: "darkred",
    color: "white",
    padding: "12px 24px",
    margin: "10px",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 0 10px rgba(255, 0, 0, 0.7)",
  },
  cancelButton: {
    backgroundColor: "black",
    color: "white",
    padding: "12px 24px",
    margin: "10px",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)",
  },
};

export default Deslogar;
