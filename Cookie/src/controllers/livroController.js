const livroModel = require('src/models/livroModel');

exports.listarTodos = async (req, res) => {
    try {
        const livros = await livroModel.findAll();
        res.json(livros);
    } catch (err) {
        res.status(500).json({ message: "Erro ao buscar livros." });
    }
};

// GET por ID
exports.buscarporId = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const livro = await livroModel.findById(id);
        if (livro) {
            res.json(livro);
        } else {
            res.status(404).json({ message: 'Livro não encontrado.' });
        }
    } catch (err) {
        res.status(500).json({ message: "Erro no servidor." });
    }
};

// POST criar
exports.criar = async (req, res) => {
    const { titulo, autor, genero, ano_publicacao } = req.body;

    if (!titulo || !autor || !genero || !ano_publicacao) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
        const novoLivro = await livroModel.create(titulo, autor, genero, ano_publicacao);
        res.status(201).json(novoLivro);
    } catch (err) {
        res.status(500).json({ message: "Erro ao criar livro." });
    }
};

// PUT atualizar
exports.atualizar = async (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, autor, genero, ano_publicacao } = req.body;

    try {
        const result = await livroModel.update(id, titulo, autor, genero, ano_publicacao);

        if (result.changes > 0) {
            res.json({ id, titulo, autor, genero, ano_publicacao });
        } else {
            res.status(404).json({ message: 'Livro não encontrado para atualização.' });
        }
    } catch (err) {
        res.status(500).json({ message: "Erro ao atualizar livro." });
    }
};

// DELETE deletar
exports.deletar = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const result = await livroModel.delete(id);
        if (result.changes > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Livro não encontrado.' });
        }
    } catch (err) {
        res.status(500).json({ message: "Erro ao deletar livro." });
    }
};
