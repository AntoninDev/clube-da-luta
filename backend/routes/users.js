import express from 'express';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// 📌 Obter dados de um usuário
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const { data: user, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json(user);
});

// 📌 Atualizar dados do usuário
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome_completo, nome_usuario, idade, peso, altura, estilo_luta } = req.body;

    const { data, error } = await supabase
        .from('usuarios')
        .update({ nome_completo, nome_usuario, idade, peso, altura, estilo_luta })
        .eq('id', id);

    if (error) {
        return res.status(400).json({ error: 'Erro ao atualizar usuário' });
    }

    res.json({ message: 'Usuário atualizado com sucesso!' });
    console.log(`Usuário `)
});


// 📌 Excluir usuário
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const { error } = await supabase
        .from('usuarios')
        .delete()
        .eq('id', id);

    if (error) {
        return res.status(400).json({ error: 'Erro ao excluir usuário' });
    }

    res.json({ message: 'Usuário excluído com sucesso!' });
});

export default router;
