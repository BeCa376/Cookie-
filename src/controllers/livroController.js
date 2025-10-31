// Array para simular uma base de dados de livros
let livros = [
    { id: 1, titulo: 'O Senhor dos Anéis', autor: 'J.R.R. Tolkien', genero: 'Fantasia', ano_publicacao: 1954 },
    { id: 2, titulo: '1984', autor: 'George Orwell', genero: 'Distopia', ano_publicacao: 1949 },
    { id: 3, titulo: 'O Guia do Mochileiro das Galáxias', autor: 'Douglas Adams', genero: 'Ficção Científica', ano_publicacao: 1979 },
];

let nextId = 4;

exports.listarTodos = (req, res) => {   
    res.json(livros);
}

exports.buscarporId = (req, res) => {
    // Converte o ID da rota (que é string) para número
    const idLivro = parseInt(req.params.id);
    // Encontra o livro no array
    const livroEncontrado = livros.find(l => l.id === idLivro);

    if (livroEncontrado) {
        res.json(livroEncontrado);
    } else {
        // Se não encontrar, retorna erro 404
        res.status(404).json({ message: 'Livro não encontrado.' });
    }
}

exports.criar = (req, res) => {
    // Pega os dados do corpo da requisição
    const { titulo, autor, genero, ano_publicacao } = req.body;
  
    // Validação simples
    if (!titulo || !autor || !genero || !ano_publicacao) {
      return res.status(400).json({ message: 'Todos os campos (titulo, autor, genero, ano_publicacao) são obrigatórios.' });
    }

    // Cria o novo objeto livro
    const novoLivro = {
        id: nextId++, 
        titulo, 
        autor, 
        genero, 
        ano_publicacao
    };

    livros.push(novoLivro);
    res.status(201).json(novoLivro);
}

exports.atualizar = (req, res) => {
    const id = parseInt(req.params.id);
    const livroIndex = livros.findIndex(l => l.id === id);
  
    if (livroIndex === -1) {
        return res.status(404).json({ message: 'Livro não encontrado.' });
    }

    const { titulo, autor, genero, ano_publicacao } = req.body;
    const livroAtual = livros[livroIndex];

    livros[livroIndex] = {
        ...livroAtual,
        titulo: titulo !== undefined ? titulo : livroAtual.titulo,
        autor: autor !== undefined ? autor : livroAtual.autor,
        genero: genero !== undefined ? genero : livroAtual.genero,
        ano_publicacao: ano_publicacao !== undefined ? ano_publicacao : livroAtual.ano_publicacao
    };
    
    res.json(livros[livroIndex]);
};


exports.deletar = (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = livros.length;
    
    livros = livros.filter(l => l.id !== id);

    if (livros.length < initialLength) {
        
        res.status(200).json({ message: 'Livro removido com sucesso' });
    } else {
        res.status(404).json({ message: 'Livro não encontrado.' });
    }
};