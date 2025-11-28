const Livro = require('../Models/livro'); 

// GET listar todos
exports.getAllLivros = async (req, res) => {
    try {
        const livros = await Livro.findAll(); 
        res.json(livros);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro no servidor." });
    }
};

// GET por ID
exports.getLivroById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
    
        const livro = await Livro.findByPk(id); 
        if (livro) {
            res.json(livro);
        } else {
            res.status(404).send('Livro não encontrado.');
        }
    } catch (err) {
        res.status(500).json({ message: "Erro no servidor." });
    }
};

// POST criar
exports.createLivro = async (req, res) => {
    const { nome, autor } = req.body;
    
    if (!nome || !autor) {
        return res.status(400).json({ message: 'Nome e autor são obrigatórios.' });
    }

    try {
        const novoLivro = await Livro.create({ nome, autor });
        res.status(201).json(novoLivro);
    } catch (err) {
        res.status(500).json({ message: "Erro no servidor." });
    }
};

// PUT atualizar
exports.updateLivro = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, autor } = req.body;

    if (!nome || !autor) {
        return res.status(400).json({ message: 'Nome e autor são obrigatórios.' });
    }

    try {
        const [updated] = await Livro.update({ nome, autor }, {
            where: { id: id }
        });

        if (updated) {
            const livroAtualizado = await Livro.findByPk(id);
            res.json(livroAtualizado);
        } else {
            res.status(404).json({ message: 'Livro não encontrado.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro no servidor." });
    }
};

// DELETE deletar
exports.deleteLivro = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const deleted = await Livro.destroy({
            where: { id: id }
        });

        if (deleted) {
            res.status(204).send(); 
        } else {
            res.status(404).json({ message: 'Livro não encontrado.' });
        }
    } catch (err) {
        res.status(500).json({ message: "Erro no servidor." });
    }
};