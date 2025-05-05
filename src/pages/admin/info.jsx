import { useEffect, useState } from 'react';

function UsuariosOnline() {
  const [usuarios, setUsuarios] = useState([]);
  const [quantidade, setQuantidade] = useState(0);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchOnlineUsers = async () => {
      try {
        const response = await fetch('http://localhost:4000/users/online');
        const json = await response.json();
        setUsuarios(json.online_users);
        setQuantidade(json.total);
        setCarregando(false);
      } catch (error) {
        console.error('Erro ao buscar usuários online:', error);
      }
    };

    fetchOnlineUsers();

    // Atualiza a cada 10 segundos (opcional)
    const interval = setInterval(fetchOnlineUsers, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#1e1e1e', color: 'white', minHeight: '100vh' }}>
      <h2>👥 Usuários Online</h2>
      {carregando ? (
        <p>Carregando...</p>
      ) : (
        <>
          <p>Total online: {quantidade}</p>
          <ul>
            {usuarios.map((nome, index) => (
              <li key={index}>@{nome}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default UsuariosOnline;
