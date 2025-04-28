
function obterUsuarioLogado() {
    const dados = localStorage.getItem("usuario_logado");
    return dados ? JSON.parse(dados) : null;
}

function redirecionarSeNaoLogado() {
    const usuario = obterUsuarioLogado();
    if (!usuario) {
        window.location.href = "../pages/login.html";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    redirecionarSeNaoLogado();
});
