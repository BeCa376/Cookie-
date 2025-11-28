const livro = require('../Models/livro');

// GET listar todos
exports.getAllLivros = async (req, res) => {
    try {
        const livros = await livro.findAll(); // Método do Sequelize
        res.json(livros);
    } catch (err) {
        res.status(500).json({ message: "Erro no servidor." });
    }
};

// GET por ID
exports.getLivroById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const livro = await livro.findByPk(id); // findByPk = Find by Primary Key
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
    if (!nome || autor === undefined) {
        return res.status(400).json({ message: 'Nome e autor são obrigatórios.' }); //Nome e autor obrigatóriso seria melhor? - Madu
    }

    try {
        const novoLivro = await livro.create({ nome, autor });
        res.status(201).json(novoLivro);
    } catch (err) {
        res.status(500).json({ message: "Erro no servidor." });
    }
};


// PUT atualizar
exports.updateLivro = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, autor } = req.body;

    if (!nome || autor === undefined) {
        return res.status(400).json({ message: 'Nome e autor são obrigatórios.' });
    }

    try {
        // [0] ou [1] indica o número de linhas afetadas
        const [updated] = await Produto.update({ nome, preco }, {
            where: { id: id }
        });

        if (updated) {
            const livroAtualizado = await livro.findByPk(id);
            res.json(produtoAtualizado);
        } else {
            res.status(404).json({ message: 'Livro não encontrado.' });
        }
    } catch (err) {
        res.status(500).json({ message: "Erro no servidor." });
    }
};

// DELETE deletar
exports.deleteLivro = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const deleted = await livro.destroy({
            where: { id: id }
        });

        if (deleted) {
            res.status(204).send(); // Sucesso, sem conteúdo
        } else {
            res.status(404).json({ message: 'Livro não encontrado.' });
        }
    } catch (err) {
        res.status(500).json({ message: "Erro no servidor." });
    }
};