import React from 'react';
import { Link } from 'react-router-dom';

const videos = [
  {
    id: 'w9mGveCT-6I',
    titulo: 'Luta Épica no Subsolo',
  },
];

export default function VideosLutas() {
  return (
    <div className="flex min-h-screen bg-[#0e0e0e] text-white">

      {/* Conteúdo principal */}
      <main className="flex-1 p-4 md:p-8">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-10 text-[#e60073]">Arquivos de Luta</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <div className="w-full aspect-video">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.titulo}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-[#ff4d6d]">{video.titulo}</h2>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
