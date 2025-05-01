import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser, atualizarUsuarioLocal } from "../../services/api"; // use a função certa
import Select from 'react-select';
import './editar.css';

const EditarPerfil = () => {
  const navigate = useNavigate();

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const uploadAvatar = async (file) => {
    const user = JSON.parse(localStorage.getItem("usuario_info"));
    if (!user || !file) return;

    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("userId", user.id);

    try {
      const response = await fetch("http://localhost:4000/users/upload-avatar", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.avatarUrl) {
        const updatedUser = { ...user, avatarUrl: data.avatarUrl };
        localStorage.setItem("usuario_info", JSON.stringify(updatedUser));
      }
    } catch (err) {
      console.error("Erro ao enviar avatar:", err);
      alert("Erro ao enviar imagem de perfil.");
    }
  };


  const estilosDisponiveis = [
    { value: "Luta de rua", label: "Luta de rua" },
    { value: "Boxe", label: "Boxe" },
    { value: "Muay Thai", label: "Muay Thai" },
    { value: "Jiu-Jitsu", label: "Jiu-Jitsu" },
    { value: "Karate", label: "Karate" },
    { value: "Taekwondo", label: "Taekwondo" },
    { value: "Wrestling", label: "Wrestling" },
    { value: "Kickboxing", label: "Kickboxing" },
    { value: "Capoeira", label: "Capoeira" },
    { value: "Krav Maga", label: "Krav Maga" },
    { value: "MMA", label: "MMA" }
  ];

  const [formData, setFormData] = useState({
    nome: "",
    nome_usuario: "",
    idade: "",
    peso: "",
    altura: "",
    estilo_luta: []
  });

  const [loadingInicial, setLoadingInicial] = useState(true);
  const [loadingSalvar, setLoadingSalvar] = useState(false);

  useEffect(() => {
    const carregarDados = async () => {
      await atualizarUsuarioLocal(null, setLoadingInicial);
      const user = JSON.parse(localStorage.getItem("usuario_info"));

      if (user) {
        setFormData({
          nome: user.nome_completo || "",
          nome_usuario: user.nome_usuario || "",
          idade: user.idade || "",
          peso: user.peso || "",
          altura: user.altura || "",
          estilo_luta: Array.isArray(user.estilo_luta)
            ? user.estilo_luta
            : user.estilo_luta
            ? user.estilo_luta.split(", ")
            : []
        });
      }
    };

    carregarDados();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("usuario_info"));
    if (!user) return;

    const updatedData = {
      nome_completo: formData.nome,
      nome_usuario: formData.nome_usuario,
      idade: formData.idade,
      peso: formData.peso || null,
      altura: formData.altura || null,
      estilo_luta: formData.estilo_luta.join(", ")
    };

    if (avatarFile) {
      await uploadAvatar(avatarFile);
    }

    try {
      setLoadingSalvar(true);
      await updateUser(user.id, updatedData);
      const updatedUser = { ...user, ...updatedData };
      localStorage.setItem("usuario_info", JSON.stringify(updatedUser));
      navigate("/profile");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      alert("Erro ao atualizar perfil.");
    } finally {
      setLoadingSalvar(false);
    }
  };

  const handleCancel = () => navigate("/profile");

  if (loadingInicial) {
    return <p style={{ color: "#eee", textAlign: "center" }}>Carregando dados do usuário...</p>;
  }

  return (
    <div className="container">
      <h1>Editar Perfil</h1>
      <form id="edit-profile-form" onSubmit={handleSubmit}>
      <label className="text-white font-semibold block mb-2">Foto de Perfil</label>


<img
  src={
    avatarPreview ||
    JSON.parse(localStorage.getItem("usuario_info"))?.avatarUrl ||
    "./default-avatar.webp"
  }
  alt="Prévia do avatar"
  id="fotoPerfil"
/>


        <label className="cursor-pointer inline-block bg-pink-700 hover:bg-pink-800 text-white px-4 py-2 rounded text-sm transition">
          Escolher nova foto
          <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file)); // preview local
    }
  }}
/>
        </label>

        <label htmlFor="nome">Nome</label>
        <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />

        <label htmlFor="nome_usuario">Nome de usuário</label>
        <input type="text" id="nome_usuario" name="nome_usuario" value={formData.nome_usuario} onChange={handleChange} required />

        <label htmlFor="idade">Idade</label>
        <input type="number" id="idade" name="idade" value={formData.idade} onChange={handleChange} required />

        <label htmlFor="peso">Peso (kg)</label>
        <input type="number" step="0.1" id="peso" name="peso" value={formData.peso} onChange={handleChange} />

        <label htmlFor="altura">Altura (cm)</label>
        <input type="number" id="altura" name="altura" value={formData.altura} onChange={handleChange} />

        <label>Estilo(s) de luta</label>
        <Select
          isMulti
          name="estilo_luta"
          options={estilosDisponiveis}
          value={estilosDisponiveis.filter(opt => formData.estilo_luta.includes(opt.value))}
          onChange={(selectedOptions) =>
            setFormData(prev => ({
              ...prev,
              estilo_luta: selectedOptions.map(option => option.value)
            }))
          }
          isSearchable={false}
          styles={{
            control: (provided) => ({
                ...provided,
                backgroundColor: '#111',
                borderColor: '#555',
                color: '#eee',
            }),
            menu: (provided) => ({
                ...provided,
                backgroundColor: '#222',
            }),
            option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? '#555' : '#222',
                color: '#eee',
                '&:hover': { backgroundColor: '#444' }
            }),
            multiValue: (provided) => ({
                ...provided,
                backgroundColor: '#333',
            }),
            multiValueLabel: (provided) => ({
                ...provided,
                color: '#eee',
            }),
            multiValueRemove: (provided) => ({
                ...provided,
                color: '#eee',
                ':hover': {
                    backgroundColor: '#555',
                    color: 'white',
                },
            }),
        }}
        />

        {loadingSalvar ? (
          <p style={{ color: "#eee", marginTop: "1rem" }}>Salvando alterações...</p>
        ) : (
          <>
            <button type="submit">Salvar alterações</button>
            <button type="button" onClick={handleCancel}>Cancelar alterações</button>
          </>
        )}
      </form>
    </div>
  );
};

export default EditarPerfil;
