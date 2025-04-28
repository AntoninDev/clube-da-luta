if(localStorage.getItem("usuario_logado") == "true") {
    window.location.href = "../pages/feed.html";
}

document.addEventListener('DOMContentLoaded', function () {
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
  
    togglePassword.addEventListener('click', function () {
      const type = passwordInput.type === 'password' ? 'text' : 'password';
      passwordInput.type = type;
      
      this.textContent = type === 'password' ? '👁️' : '🙈';
    });
  });
  
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('form').addEventListener('submit', async function (event) {
        event.preventDefault(); // Evita o reload da página

        const emailOrUsername = document.getElementById("emailOrUsername").value;

        const password = document.getElementById("password").value;
        const mensagem = document.getElementById('mensagem');

        if (mensagem) mensagem.innerHTML = ""; // Limpa mensagens anteriores

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emailOrUsername, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("usuario_info", JSON.stringify(data.user))
                localStorage.setItem("usuario_logado", true);
                mensagem.innerHTML = `<p style="color: #4CAF50; font-weight: bold;">✅ Login bem-sucedido! Redirecionando...</p>`;
                setTimeout(() => {
                    window.location.href = data.redirect;
                }, 1500);
            } else {
                mensagem.innerHTML = `<p style="color: red; font-weight: bold;">❌ ${data.error || "Erro ao fazer login."}</p>`;
                
            }
        } catch (error) {
            mensagem.innerHTML = `<p style="color: red; font-weight: bold;">❌ Erro ao conectar com o servidor.</p>`;
        }
    });
});

function testarLoginEmail() {
    document.getElementById('emailOrUsername').value = 'emailescolar727@gmail.com'
    document.getElementById('password').value = 'antonio1901'

    document.getElementById('btn_submit').click();
  }

function testarLoginUser() {
    document.getElementById('emailOrUsername').value = 'AntoninDev'
    document.getElementById('password').value = 'antonio1901'

    document.getElementById('btn_submit').click();
  }