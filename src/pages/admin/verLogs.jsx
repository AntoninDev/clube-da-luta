import React, { useState, useEffect } from 'react';

const AdminLogs = () => {
  const [activeTab, setActiveTab] = useState('todos');
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const fetchAllLogs = async () => {
    try {
      const response = await fetch('http://localhost:4000/logs');
      const data = await response.json();
      setLogs(data);
    } catch (error) {
      console.error('Erro ao buscar logs:', error);
    }
  };

  const fetchLogsByUser = async () => {
    try {
      const response = await fetch(`http://localhost:4000/logs/buscar?q=${search}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Erro ao buscar logs do usuário:', error);
    }
  };

  useEffect(() => {
    if (activeTab === 'todos') {
      fetchAllLogs();
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-pink-500">Verificação de Logs</h1>

      <div className="flex mb-4">
        <button
          onClick={() => setActiveTab('todos')}
          className={`mr-4 px-4 py-2 rounded ${
            activeTab === 'todos' ? 'bg-pink-600' : 'bg-zinc-800'
          }`}
        >
          Todos os Logs
        </button>
        <button
          onClick={() => setActiveTab('usuario')}
          className={`px-4 py-2 rounded ${
            activeTab === 'usuario' ? 'bg-pink-600' : 'bg-zinc-800'
          }`}
        >
          Buscar por Usuário
        </button>
      </div>

      {activeTab === 'todos' && (
        <div className="space-y-4">
          {logs.map((log) => (
            <div key={log.id} className="bg-zinc-900 p-4 rounded shadow">
              <p><strong>Usuário:</strong> {log.user_id}</p>
              <p><strong>Mensagem:</strong> {log.message}</p>
              <p className="text-sm text-zinc-400">{new Date(log.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'usuario' && (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nome de usuário, nome completo ou email"
            className="w-full p-3 rounded bg-zinc-800 text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={fetchLogsByUser}
            className="bg-pink-600 hover:bg-pink-700 py-2 px-4 rounded"
          >
            Buscar
          </button>

          {searchResults.map((log) => (
            <div key={log.id} className="bg-zinc-900 p-4 rounded shadow">
              <p><strong>Usuário:</strong> {log.user_id}</p>
              <p><strong>Mensagem:</strong> {log.message}</p>
              <p className="text-sm text-zinc-400">{new Date(log.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminLogs;
