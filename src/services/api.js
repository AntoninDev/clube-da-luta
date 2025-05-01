const API_URL = 'https://backend-clube-da-luta.onrender.com'; // URL principal para usuários
const USERS_URL = `${API_URL}/users`
const REGISTER_URL = `${API_URL}/register`

// 📌 Função para obter os dados de um usuário pelo ID
export const getUserById = async (id) => {
  try {
    const response = await fetch(`${USERS_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Erro ao recuperar usuário');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const atualizarUsuarioLocal = async (setUsuario, setLoading) => {
  const userInfo = localStorage.getItem('usuario_info');

  if (!userInfo) {
    console.error("Dados do usuário não encontrados no localStorage.");
    if (setLoading) setLoading(false);
    return;
  }

  const userId = JSON.parse(userInfo)?.id;

  if (!userId) {
    console.error("ID do usuário não encontrado no localStorage.");
    if (setLoading) setLoading(false);
    return;
  }

  try {
    const userData = await getUserById(userId);

    if (userData) {
      if (setUsuario) setUsuario(userData); // só atualiza se foi passado
      localStorage.setItem('usuario_info', JSON.stringify(userData));
    } else {
      console.error('Usuário não encontrado na API');
    }
  } catch (error) {
    console.error("Erro ao carregar dados do usuário:", error);
  } finally {
    if (setLoading) setLoading(false);
  }
};



// 📌 Função para atualizar os dados do usuário
export const updateUser = async (id, updatedData) => {
  try {
    const response = await fetch(`${USERS_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar usuário');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 📌 Função para deletar um usuário
export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${USERS_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Erro ao excluir usuário');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 📌 Função para registrar um novo usuário
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${REGISTER_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao registrar usuário');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro no registerUser:', error);
    throw error;
  }
};
