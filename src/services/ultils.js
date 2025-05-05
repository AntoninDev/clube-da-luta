// utils.js
export const verificarLogin = (navigate) => {
    const estaLogado = localStorage.getItem("usuario_logado") === "true";
    const userId = localStorage.getItem("usuario_id");
    if (!estaLogado) {
        navigate("/login");
    }
    if (!userId) {
      localStorage.clear();
      navigate("/login");
    }
  };
  