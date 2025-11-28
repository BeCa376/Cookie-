const livros = require("../data/livros");

// ------------------------------
// 1) forEach
// ------------------------------
function listarComForEach(req, res) {
    let mensagens = [];

    livros.forEach((livro) => {
        mensagens.push(`O livro "${livro.titulo}" custa R$ ${livro.preco}`);
    });

    return res.json(mensagens);
}

// ------------------------------
// 2) filter
// ------------------------------
function filtrarPorCategoria(req, res) {
    const categoria = req.params.categoria;

    const filtrados = livros.filter((livro) => {
        return livro.categoria === categoria;
    });

    return res.json(filtrados);
}

// ------------------------------
// 3) find
// ------------------------------
function buscarPorId(req, res) {
    const id = Number(req.params.id);

    const encontrado = livros.find((livro) => {
        return livro.id === id;
    });

    return res.json(encontrado ?? { mensagem: "Livro não encontrado" });
}

// ------------------------------
// 4) map – transformar itens
// ------------------------------
function aplicarDesconto(req, res) {
    const livrosComDesconto = livros.map((livro) => {
        return {
            id: livro.id,
            titulo: livro.titulo,
            preco: livro.preco * 0.9,
            categoria: livro.categoria
        };
    });

    return res.json(livrosComDesconto);
}

// ------------------------------
// 4b) map – só títulos
// ------------------------------
function listarTitulos(req, res) {
    const titulos = livros.map((livro) => livro.titulo);
    return res.json(titulos);
}

// ------------------------------
// 5) reduce
// ------------------------------
function calcularTotal(req, res) {
    const total = livros.reduce((acumulador, livro) => {
        return acumulador + livro.preco;
    }, 0);

    return res.json({ valorTotal: total });
}

// ------------------------------
// 6) Spread – adicionar novo livro
// ------------------------------
function adicionarLivro(req, res) {
    const novoLivro = req.body;

    const novaLista = [...livros, novoLivro];

    return res.json({
        mensagem: "Livro adicionado (imutavelmente)",
        novaLista
    });
}

// ------------------------------
// 6b) Spread + map – atualizar valor
// ------------------------------
function atualizarPreco(req, res) {
    const id = Number(req.params.id);
    const { novoPreco } = req.body;

    const atualizados = livros.map((livro) => {
        if (livro.id !== id) return livro;

        return {
            ...livro,
            preco: novoPreco
        };
    });

    return res.json(atualizados);
}

// ------------------------------
// 7) Desestruturação
// ------------------------------
function desestruturar(req, res) {
    let lista = [];

    livros.forEach(({ titulo, preco }) => {
        lista.push(`Título: ${titulo}, Preço: R$ ${preco}`);
    });

    return res.json(lista);
}

module.exports = {
    listarComForEach,
    filtrarPorCategoria,
    buscarPorId,
    aplicarDesconto,
    listarTitulos,
    calcularTotal,
    adicionarLivro,
    atualizarPreco,
    desestruturar
};
