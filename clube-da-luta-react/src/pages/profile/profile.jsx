import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from "../menu/menu";
import './profile.css'; // Estilos do perfil
import fotoPerfil from './profile.jpg';
import { getUserById } from '../../services/api.js'; // Importando a função getUserById para buscar dados do usuário

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true); // Adicionando estado de carregamento
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('usuario_info');
    console.log('Dados no localStorage:', userInfo); // Logando os dados do localStorage

    if (userInfo) {
      const userId = JSON.parse(userInfo)?.id; // Pegando o ID do usuário armazenado no localStorage
      console.log('ID do usuário:', userId); // Logando o ID do usuário

      if (userId) {
        const fetchUser = async () => {
          try {
            console.log('Buscando dados do usuário...');
            const userData = await getUserById(userId); // Buscando os dados do usuário na API
            console.log('Dados do usuário recebidos:', userData); // Logando os dados recebidos

            if (userData) {
              setUsuario(userData); // Atualizando o estado com os dados obtidos
              localStorage.setItem('usuario_info', JSON.stringify(userData)); // Atualizando o localStorage com os dados mais recentes
            } else {
              console.error('Usuário não encontrado na API');
            }
          } catch (error) {
            console.error("Erro ao carregar dados do usuário:", error);
          } finally {
            setLoading(false); // Alterando o estado de carregamento
          }
        };

        fetchUser(); // Chamando a função para buscar o usuário
      } else {
        console.error("ID do usuário não encontrado no localStorage.");
        setLoading(false); // Se não tiver ID, não fica mais carregando
      }
    } else {
      console.error("Dados do usuário não encontrados no localStorage.");
      setLoading(false); // Se não tiver dados, não fica mais carregando
    }
  }, []); // Rodar o useEffect apenas uma vez quando o componente for montado

  const handleEditarPerfil = () => {
    navigate('/editar-perfil'); // Redirecionando para a página de editar perfil
  };

  // Se estiver carregando, exibe a mensagem de carregamento
  if (loading) return <p>Carregando perfil...</p>;

  // Se não encontrar o usuário, exibe mensagem de erro
  if (!usuario) return <p>Erro ao carregar perfil. Tente novamente mais tarde.</p>;

  return (
    <div className="container">
      <Menu />

      <div className="info-usuario">
        <div className="foto-wrapper">
            <img id="fotoPerfil" src={fotoPerfil} alt="Foto de perfil" />
        </div>
        <h2 className="titulo-usuario">{usuario.nome_completo}</h2>
        <p><strong>Nome de usuário:</strong> <span>{usuario.nome_usuario}</span></p>
        <p><strong>Data de nascimento:</strong> <span>{usuario.data_nascimento}</span></p>
        <p><strong>Idade:</strong> <span>{usuario.idade}</span></p>
        <p><strong>Email:</strong> <span>{usuario.email}</span></p>
        <p><strong>Membro desde:</strong> <span>{usuario.data_criacao}</span></p>

        <div className="info-luta">
          <h3>Informações de Luta</h3>
          <p><strong>Peso:</strong> <span>{usuario.peso ? `${usuario.peso} kg` : 'Não informado'}</span></p>
          <p><strong>Altura:</strong> <span>{usuario.altura ? `${usuario.altura} cm` : 'Não informado'}</span></p>
          <p><strong>Estilo de luta:</strong> <span>{usuario.estilo_luta ? usuario.estilo_luta : 'Não informado'}</span></p>
        </div>

        <button className="botao-editar" onClick={handleEditarPerfil}>
          Editar perfil
        </button>
      </div>
    </div>
  );
};

export default Perfil;
