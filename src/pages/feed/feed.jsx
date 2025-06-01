import './feed.css';
import defaultAvatar from '../../assets/native_imgs/default-avatar.webp';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";


const Feed = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [comentarios, setComentarios] = useState({});
  const [showComentarios, setShowComentarios] = useState({});
  const [userLikes, setUserLikes] = useState([]);
  const [loading, setLoading] = useState(true); 
  const userId = localStorage.getItem("usuario_id");

  const fetchPosts = useCallback(async () => {
    setLoading(true); 
    try {
      const postsRes = await fetch(`${process.env.REACT_APP_API_URL}/posts`);
      const postsData = await postsRes.json();
      const likesRes = await fetch(`${process.env.REACT_APP_API_URL}/user-likes/${userId}`);
      const likesData = await likesRes.json();
      const postsOrdenados = postsData.sort((a, b) => {
        if (a.fixed !== b.fixed) return b.fixed - a.fixed;
        return new Date(b.created_at) - new Date(a.created_at); 
      });
      setPosts(postsOrdenados);
      setUserLikes(likesData);
    } catch (err) {
      console.error('Erro ao buscar posts ou likes:', err);
    } finally {
      setLoading(false); 
    }
  }, [userId]);

  useEffect(() => {
    fetchPosts(); 
  }, [fetchPosts]);

  const handleLikeToggle = async (postId) => {
    const liked = userLikes.includes(postId);
  
    // Atualiza o estado local de userLikes
    setUserLikes((prevLikes) =>
      liked ? prevLikes.filter((id) => id !== postId) : [...prevLikes, postId]
    );
  
    // Atualiza o número de likes no estado `posts`
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  
    // Faz a requisição ao backend
    try {
      const url = `${process.env.REACT_APP_API_URL}/likes`;
      await fetch(url, {
        method: liked ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: postId, user_id: userId }),
      });
    } catch (err) {
      console.error('Erro ao curtir/descurtir:', err);
  
      // Reverte alterações se der erro
      setUserLikes((prevLikes) =>
        liked ? [...prevLikes, postId] : prevLikes.filter((id) => id !== postId)
      );
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                likes: liked ? post.likes + 1 : post.likes - 1,
              }
            : post
        )
      );
    }
  };
  

  const fetchComentarios = async (postId) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/comments/${postId}`);
      const data = await res.json();
      setComentarios((prev) => ({ ...prev, [postId]: data }));
    } catch (err) {
      console.error('Erro ao buscar comentários:', err);
    }
  };

  const handleSubmitComment = async (postId, commentText) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          post_id: postId,
          user_id: userId,
          content: commentText,
        }),
      });
      fetchComentarios(postId);
    } catch (err) {
      console.error('Erro ao enviar comentário:', err);
    }
  };

  return (
    <div className="feed-container">

 
      {loading ? (
        <div className="loading-message">Carregando posts...</div>
      ) : (
        <div className="feed-scroll-area">
          {posts.map((post) => {
            const isLiked = userLikes.includes(post.id);
            return (
              <div key={post.id} className="post-card">
                <div className="post-header">
                  <img src={post.usuarios.avatarUrl || defaultAvatar} alt="avatar" className="avatar" />
                  <div><strong>{post.usuarios.nome_usuario}</strong></div>
                </div>
                {post.image_url && (
                  <img src={post.image_url} alt="Postagem" className="post-image" />
                )}
                <div className="post-content">
                  <p className="legenda">
                    <strong>Legenda:</strong> {post.caption}
                  </p>
                  <p className="post-date">
                    <strong>Postado em: </strong>{new Date(post.created_at).toLocaleString()}
                  </p>
                  <div className="post-actions">
                    <button
                      className="btn-curtir"
                      onClick={() => handleLikeToggle(post.id)}
                    >
                      {isLiked ? '❤️' : '🤍'} {post.likes}
                    </button>
                    <button
                      className="btn-comentar"
                      onClick={() => {
                        setShowComentarios((prev) => ({
                          ...prev,
                          [post.id]: !prev[post.id],
                        }));
                        if (!comentarios[post.id]) fetchComentarios(post.id);
                      }}
                    >
                      {showComentarios[post.id] ? '💬 Ocultar Comentários' : '💬 Exibir Comentários'}
                    </button>
                  </div>
                  {showComentarios[post.id] && (
                    <div className="comentarios">
                      <div className="comentario-form">
                        <textarea
                          className='input-comment'
                          placeholder="Escreva um comentário..."
                          id={`comment-${post.id}`}
                        />
                        <button
                          className='btn-enviar'
                          onClick={() => {
                            const commentText = document.getElementById(`comment-${post.id}`).value;
                            if (commentText) {
                              handleSubmitComment(post.id, commentText);
                              document.getElementById(`comment-${post.id}`).value = '';
                            }
                          }}
                        >
                          Enviar
                        </button>
                      </div>
                      {comentarios[post.id]?.map((comentario) => (
                        <div key={comentario.id}>
                          <p><strong>@{comentario.usuarios.nome_usuario}</strong> {comentario.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Feed;
