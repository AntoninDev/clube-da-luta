document.getElementById('editarPerfil').addEventListener('click', () => {
    window.location.href = '../pages/editar_perfil.html';
  });

  const usuario = JSON.parse(localStorage.getItem("usuario_info"));

document.getElementById("nomeCompleto").innerHTML = usuario.nome_completo
document.getElementById("nomeUsuario").innerHTML = usuario.nome_usuario
document.getElementById("idade").innerHTML = usuario.idade
document.getElementById("email").innerHTML = usuario.email
document.getElementById("dataNascimento").innerHTML = usuario.data_nascimento
document.getElementById("membroDesde").innerHTML = usuario.data_criacao

usuario.peso == null ? document.getElementById("peso").innerHTML = 'Não informado' : document.getElementById("peso").innerHTML = usuario.peso
usuario.altura == null ? document.getElementById("altura").innerHTML = 'Não informado' : document.getElementById("altura").innerHTML = usuario.altura
usuario.estilo == null ? document.getElementById("estilo").innerHTML = 'Não informado' : document.getElementById("estilo").innerHTML = usuario.estilo_luta
  