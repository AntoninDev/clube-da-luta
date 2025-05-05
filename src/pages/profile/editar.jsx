import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser, getUserById, uploadAvatar } from "../../services/api";
import { verificarLogin } from "../../services/ultils";
import Select from 'react-select';
import './editar.css';
import fotoPerfilPadrao from './default-avatar.webp';

const EditarPerfil = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    nome_usuario: "",
    idade: "",
    peso: "",
    altura: "",
    estilo_luta: [],
    avatarUrl: ""
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loadingInicial, setLoadingInicial] = useState(true);
  const [loadingSalvar, setLoadingSalvar] = useState(false);

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

  useEffect(() => {
    const carregarUsuario = async () => {
      verificarLogin(navigate);
      try {
        const usuario = await getUserById(localStorage.getItem("usuario_id"));

        setFormData({
          nome: usuario.nome_completo || "",
          nome_usuario: usuario.nome_usuario || "",
          idade: usuario.idade || "",
          peso: usuario.peso || "",
          altura: usuario.altura || "",
          estilo_luta: Array.isArray(usuario.estilo_luta)
            ? usuario.estilo_luta
            : usuario.estilo_luta
              ? usuario.estilo_luta.split(", ").map(s => s.trim())
              : [],
          avatarUrl: usuario.avatarUrl || ""
        });

        setAvatarPreview(usuario.avatarUrl || null);
      } catch (err) {
        console.error("Erro ao carregar usuário:", err);
        navigate("/profile");
      } finally {
        setLoadingInicial(false);
      }
    };

    carregarUsuario();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = localStorage.getItem("usuario_id");
    if (!id) return;

    setLoadingSalvar(true);

    const updatedData = {
      nome_completo: formData.nome,
      nome_usuario: formData.nome_usuario,
      idade: formData.idade,
      peso: formData.peso || null,
      altura: formData.altura || null,
      estilo_luta: formData.estilo_luta.join(", ")
    };

    try {
      if (avatarFile) await uploadAvatar(avatarFile);
      await updateUser(id, updatedData);
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
          src={avatarPreview || fotoPerfilPadrao}
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
                setAvatarPreview(URL.createObjectURL(file));
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
          onChange={(selected) =>
            setFormData(prev => ({
              ...prev,
              estilo_luta: selected.map(option => option.value)
            }))
          }
          isSearchable={false}
          styles={{
            control: (base) => ({ ...base, backgroundColor: '#111', borderColor: '#555', color: '#eee' }),
            menu: (base) => ({ ...base, backgroundColor: '#222' }),
            option: (base, state) => ({ ...base, backgroundColor: state.isSelected ? '#555' : '#222', color: '#eee', '&:hover': { backgroundColor: '#444' } }),
            multiValue: (base) => ({ ...base, backgroundColor: '#333' }),
            multiValueLabel: (base) => ({ ...base, color: '#eee' }),
            multiValueRemove: (base) => ({ ...base, color: '#eee', ':hover': { backgroundColor: '#555', color: 'white' } })
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
