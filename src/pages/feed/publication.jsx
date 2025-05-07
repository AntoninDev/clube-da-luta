import "./publication.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Publication = () => {
  const [caption, setCaption] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          caption,
          user_id: localStorage.getItem('usuario_id'), // Supondo que o ID do usuário esteja no localStorage
        }),
      });

      if (res.ok) {
        // Redireciona para a página de feed após a postagem ser criada
        navigate('/');
      } else {
        alert('Erro ao publicar!');
      }
    } catch (err) {
      console.error('Erro ao enviar a publicação:', err);
      alert('Erro ao enviar a publicação!');
    }
  };

  return (
    <div className="publication-container">
      <h1>Criar Nova Publicação</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="caption">Legenda</label>
          <textarea
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Digite a legenda..."
            required
          />
        </div>
        <button type="submit">Publicar</button>
      </form>
    </div>
  );
};

export default Publication;
