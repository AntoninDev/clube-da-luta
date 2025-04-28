
document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("edit-profile-form");
  const user = JSON.parse(localStorage.getItem("usuario_info"));

  if (user) {
    document.getElementById("nome").value = user.nome_completo || "";
    document.getElementById("idade").value = user.idade || "";
    document.getElementById("peso").value = user.peso || "";
    document.getElementById("altura").value = user.altura || "";
    document.getElementById("estilo").value = user.estilo || "";
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dadosAtualizados = {
      nome: document.getElementById("nome").value,
      idade: document.getElementById("idade").value,
      peso: document.getElementById("peso").value,
      altura: document.getElementById("altura").value,
      estilo: document.getElementById("estilo").value
    };

    const { user: usuarioAtual } = user;

    try {
      const response = await fetch("http://localhost:3000/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: user.id, ...dadosAtualizados })
      });

      if (response.ok) {
        localStorage.setItem("usuario", JSON.stringify({ ...user, ...dadosAtualizados }));
        alert("Perfil atualizado com sucesso!");
      } else {
        alert("Erro ao atualizar perfil.");
      }
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("Erro de conexão.");
    }
  });
});
