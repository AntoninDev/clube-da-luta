import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

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

function calcularIdade(dataNascimentoString) {
    const nascimento = new Date(dataNascimentoString); // ex: "2007-01-19"
    const hoje = new Date();
  
    let idade = hoje.getFullYear() - nascimento.getFullYear();
  
    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDate();
  
    const mesNascimento = nascimento.getMonth();
    const diaNascimento = nascimento.getDate();
  
    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
      idade--;
    }
  
    return idade;
  }


dotenv.config();

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// 📌 Rota para Cadastro
router.post('/register', async (req, res) => {
    const { email, password, nome_usuario, nome_completo, data_nascimento } = req.body;
    console.log(`[${GetHora()}] - Recebendo novo cadastro (${nome_completo})`)

    const { data: existingUsers, error: queryError } = await supabase
        .from('usuarios')
        .select('email, nome_completo, nome_usuario, celular')
        .or(`email.eq.${email},nome_completo.eq.${nome_completo},nome_usuario.eq.${nome_usuario}`)

    if (queryError) {
        console.error(`[${GetHora()}] - Erro ao consultar usuário: ${queryError.message}`);
        return res.status(500).json({ error: 'Erro interno no servidor' });
    }

    if (existingUsers.length > 0) {
        const emailExists = existingUsers.some(user => user.email === email);
        const nome_completoExists = existingUsers.some(user => user.nome_completo === nome_completo);
        const nome_usuarioExists = existingUsers.some(user => user.nome_usuario === nome_usuario);

        if (nome_completoExists) {
            console.log(`[${GetHora()}] - Tentativa de cadastro com nome já cadastrado (${nome_completo})`);
            return res.status(400).json({ error: 'Este nome já está registrado.' });
            
        }

        if (emailExists) {
            console.log(`[${GetHora()}] - Tentativa de cadastro com email já cadastrado (${email})`);
            return res.status(400).json({ error: 'Este email já está em uso.' });
        }
        
        
        if (nome_usuarioExists) {
            console.log(`[${GetHora()}] - Tentativa de cadastro com nome de usuario já cadastrado (${nome_usuario})`);
            return res.status(400).json({ error: 'Este nome de usuário já está registrado.' });
        }
    }

    const data_criacao = GetHora()
   
    const idade = calcularIdade(data_nascimento)

    const { data, error } = await supabase
        .from('usuarios')
        .insert([{
            email,
            password, 
            nome_completo, 
            nome_usuario, 
            data_nascimento, 
            data_criacao,
            idade
        }]);


    if (error) {
        console.error(`[${GetHora()}] - Erro ao cadastrar usuario no servidor: ${error.message}`);
        return res.status(400).json({ error: 'Erro ao cadastrar usuário no banco de dados.' });
    }

    console.log(`[${GetHora()}] - Usuario (${nome_usuario}) cadastrado com sucesso. `);
    res.json({ message: 'Usuário cadastrado com sucesso!', data });
});

router.post('/login', async (req, res) => {
    const emailOrUsername = String(req.body.emailOrUsername || '');
    const password = String(req.body.password || '');
    console.log(`[${GetHora()}] - Tentativa de login (${emailOrUsername})`);

    const isEmail = emailOrUsername.includes('@');

    const { data: user, error: fetchError } = await supabase
        .from('usuarios')
        .select('*')
        .eq(isEmail ? 'email' : 'nome_usuario', emailOrUsername)
        .maybeSingle();

    if (fetchError) {
        console.error(`[${GetHora()}] - Erro ao buscar usuario: ${fetchError.message}`);
        return res.status(500).json({ error: 'Erro interno no servidor.' });
    }

    if (!user) {
        console.log(`[${GetHora()}] - Conta (${emailOrUsername}) nao encontrada.`);
        return res.status(400).json({ error: 'Conta não encontrada, Faça seu cadastro!' });
    }

    if (user.password !== password) {
        
        console.log(`[${GetHora()}] - Tentativa de login com senha errada (${emailOrUsername}) (${user.password})`);
        return res.status(400).json({ error: 'Senha incorreta!' });
    }

    res.json({ 
        message: 'Login bem-sucedido!',
        redirect: '../pages/feed.html',
        user
        });
    console.log(`[${GetHora()}] - Login bem sucedido (${emailOrUsername})`);
});


export default router;
