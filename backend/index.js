import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';

function GetHora() {
    const agora = new Date();

    const dia = agora.getDate().toString().padStart(2, '0');
    const mes = (agora.getMonth() + 1).toString().padStart(2, '0');
    const ano = agora.getFullYear();

    const hora = agora.getHours().toString().padStart(2, '0');
    const minuto = agora.getMinutes().toString().padStart(2, '0');
    const segundo = agora.getSeconds().toString().padStart(2, '0');

    const dataHoraCompleta = `${dia}/${mes}/${ano} - ${hora}:${minuto}:${segundo}`;

    return dataHoraCompleta 

}

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Usando as rotas
app.use('/', authRoutes); // Isso permite acessar /register e /login diretamente
app.use('/users', userRoutes);

app.listen(4000, '0.0.0.0', () => {
    console.log(`[${GetHora()}] - Servidor rodando!`);
});
