import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
  
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-10 text-pink-500">Painel do Administrador</h1>
      
      <div className="bg-zinc-900 p-6 rounded-xl shadow-lg w-full max-w-md">
        <button
          onClick={() => navigate('/admin/logs')}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-4 rounded-xl transition"
        >
          Verificar Logs
        </button>
      </div>
    </div>
  );
};

export default AdminHome;
