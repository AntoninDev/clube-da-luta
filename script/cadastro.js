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
  

document.getElementById('cadastroForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita o reload da página

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const data_nascimento = document.getElementById('data_nascimento').value;
    const nome_completo = document.getElementById('name').value;
    const nome_usuario = document.getElementById('username').value;
    const mensagem = document.getElementById('mensagem');
    if (mensagem) mensagem.innerHTML = "";

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                email,
                password, 
                nome_completo, 
                nome_usuario, 
                data_nascimento
            })
        });

        const data = await response.json();

        if (response.ok) {
            mensagem.innerHTML = `
                <p style="color: #4CAF50; font-weight: bold;">🔥 Cadastro realizado com sucesso! 🔥</p>
                <p style="color: #fff;">Agora, você faz parte do Clube da Luta.</p>
                <p><a href="login.html" style="color: #ff0000; font-weight: bold; text-decoration: none;">👉 Faça login</a></p>
            `;
            document.getElementById('cadastroForm').reset();
        } else {
            mensagem.innerHTML = `<p style="color: red; font-weight: bold;">❌ ${data.error || "Erro no cadastro."}</p>`;
        }
    } catch (error) {
        mensagem.innerHTML = `<p style="color: red; font-weight: bold;">❌ Erro ao conectar com o servidor.</p>`;
    }
});

function testarCadastro() {
    document.getElementById('email').value = 'emailescolar727@gmail.com'
    document.getElementById('password').value = 'antonio1901'
    document.getElementById('data_nascimento').value = '2007-01-19'
    document.getElementById('name').value = 'Antonio Alvarenga Ribeiro'
    document.getElementById('username').value = 'AntoninDev'

    document.getElementById('btn_submit').click();
  }
  