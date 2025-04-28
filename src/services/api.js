const API_URL = 'http://192.168.0.111:4000/users'; // URL principal para usuários
const AUTH_URL = 'http://192.168.0.111:4000';       // URL principal para autenticação (registro/login)

// 📌 Função para obter os dados de um usuário pelo ID
export const getUserById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Erro ao recuperar usuário');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 📌 Função para atualizar os dados do usuário
export const updateUser = async (id, updatedData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
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
    const response = await fetch(`${API_URL}/${id}`, {
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
    const response = await fetch(`${AUTH_URL}/register`, {
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
