const Livro = require('../Models/livro'); 

// GET listar todos
exports.getAllLivros = async (req, res) => {
    try {
        const livros = await Livro.findAll(); 
        res.status(200).json(livros);
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
    const { nome, autor, genero, ano, preco } = req.body; 

    if (!nome || !autor || !preco) {
        return res.status(400).json({ message: 'Nome, autor e preço são obrigatórios.' });
    }

    try {
    
        const novoLivro = await Livro.create({ nome, autor, genero, ano, preco });
        res.status(201).json(novoLivro);
    } catch (err) {
        console.error("ERRO DETALHADO:", err); 
        res.status(500).json({ message: "Erro ao criar livro. Verifique o console." });
    }
};

// PUT atualizar
exports.updateLivro = async (req, res) => {
    const { id } = req.params;
    const { nome, autor, genero, ano, preco } = req.body;

    try {
        const livro = await Livro.findByPk(id);

        if (!livro) {
            return res.status(404).json({ message: "Livro não encontrado." });
        }
        
        livro.nome = nome || livro.nome;
        livro.autor = autor || livro.autor;
        livro.genero = genero || livro.genero;
        livro.ano = ano || livro.ano;
        livro.preco = preco || livro.preco;

        await livro.save();

        res.status(200).json(livro);
        
    } catch (err) {
        console.error("Erro ao atualizar:", err);
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