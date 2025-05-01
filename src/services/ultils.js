// utils.js
export const verificarLogin = (navigate) => {
    const estaLogado = localStorage.getItem("usuario_logado") === "true";
    if (estaLogado) {
      navigate("/profile");
    }else {
        navigate("/login");
    }
  };
  