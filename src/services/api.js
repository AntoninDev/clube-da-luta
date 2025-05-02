const API_URL = process.env.REACT_APP_API_URL;
//const API_URL = "http://localhost:4000";
const USERS_URL = `${API_URL}/users`
const REGISTER_URL = `${API_URL}/register`
const LOGS_URL = `${API_URL}/logs`;

export const criarLog = async (userId, message) => {
  try {
    const response = await fetch(`${LOGS_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user_id: userId, message })
    });

    if (!response.ok) throw new Error("Erro ao criar log");
    return await response.json();
  } catch (error) {
    console.error("Erro ao criar log:", error);
  }
};


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

// 📌 Função para upload de avatar
export const uploadAvatar = async (file) => {
  const user = await getUserById(localStorage.getItem("usuario_id"));

  if (!user || !file) return;

  const formData = new FormData();
  formData.append("avatar", file);
  formData.append("userId", user.id);

  try {
    const response = await fetch(`${USERS_URL}/upload-avatar`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.avatarUrl) {
      const updatedUser = { ...user, avatarUrl: data.avatarUrl };
      updateUser(user.id, updatedUser)
    }

    return data;
  } catch (err) {
    console.error("Erro ao enviar avatar:", err);
    throw err;
  }
};
