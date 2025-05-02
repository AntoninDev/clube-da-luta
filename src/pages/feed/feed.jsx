import './feed.css';

import imgteste from './testepostagem.jpg'
import ft from './ftpf.webp'

const postsExemplo = [
  {
    id: 1,
    usuario: {
      nome: 'Terekhov',
      avatar: ft,
    },
    imagem: imgteste,
    legenda: 'Vítima é um termo que se refere a uma pessoa que sofreu algum tipo de dano, prejuízo ou violência, seja física, emocional ou psicológica.\nnSignificado de Vítima\nUma vítima pode ser alguém que:\nFoi prejudicada: Por algum evento ou circunstância, como um acidente, desastre natural ou erro médico.',
    curtidas: 128,
    comentarios: [

    ],
  },
  // ... mais posts
];

const Feed = () => {
  return (
    <div className="feed-container">
      <h1 className="titulo-feed">Feed da Luta</h1>
      <div className="feed-scroll-area">
        {postsExemplo.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <img src={post.usuario.avatar} alt="avatar" className="avatar" />
              <div>
                <strong>{post.usuario.nome}</strong>

              </div>
            </div>
            <img src={post.imagem} alt="Postagem" className="post-image" />
            <div className="post-content">
              <p className="legenda"><strong>@{post.usuario.nome}</strong> {post.legenda}</p>
              <div className="post-actions">
                <button className="btn-curtir">❤️ {post.curtidas}</button>
                <button className="btn-comentar">💬 Comentar</button>
              </div>
              <div className="comentarios">
                {post.comentarios.map((comentario) => (
                  <p key={comentario.id}><strong>@{comentario.autor}</strong> {comentario.texto}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
