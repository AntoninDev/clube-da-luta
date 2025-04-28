import { useEffect } from "react";
import Menu from "../menu/menu"; // Importando o componente Menu
import "./feed.css";

function Feed() {
  useEffect(() => {
    // Verificação de login
    const verificarLogin = () => {
      const logado = localStorage.getItem("usuario_logado") === "true";
      if (!logado) {
        window.location.href = "/login"; // Redireciona para a página de login se não estiver logado
      }
    };

    verificarLogin();
  }, []); // Esse useEffect é executado apenas uma vez, ao montar o componente

  return (
    <div className="feed-page">
      {/* Menu como componente React */}
      <Menu />

      {/* Conteúdo principal do feed */}

        <p>“Você não é o seu trabalho. Você não é o quanto dinheiro tem no banco.”</p>

        {/* Aqui virão as postagens futuramente */}

    </div>
  );
}

export default Feed;
