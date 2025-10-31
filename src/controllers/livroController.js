const {
  getTodosLivros,
  getLivroForID,
  postNovoLivro,
  putLivroAtualizado,
  deleteID,
} = require("../services/livros");

// Controlador: retorna a lista completa de livros.
// Rota: GET /livros
function getLivros(req, res) {
  try {
    const livros = getTodosLivros();
    res.status(200).send(livros);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Controlador: retorna um único livro identificado por ID.
// Rota: GET /livros/:id
function getLivro(req, res) {
  try {
    const id = req.params.id;
    const livro = getLivroForID(id);
    res.status(200).send(livro);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Controlador: cria um novo livro com base no body da requisição.
// Rota: POST /livros
function postLivro(req, res) {
  try {
    const livroNovo = req.body;
    postNovoLivro(livroNovo);
    res.status(201).send("Livro adicionado com sucesso");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Controlador: atualiza um livro existente por ID usando o body da requisição.
// Rota: PUT /livros/:id
function putLivro(req, res) {
  try {
    const id = req.params.id;
    const body = req.body;
    putLivroAtualizado(body, id);
    res.status(200).send("Livro atualizado com sucesso");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Controlador: remove um livro por ID.
// Rota: DELETE /livros/:id
// Observação: aqui a função chama o service `deleteID` e retorna 200.
function deleteLivro(req, res) {
  try {
    const id = deleteID(req.params.id);
    res.status(200).send(`Livro com ID ${id} deletado com sucesso`);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

module.exports = {
  getLivros,
  getLivro,
  postLivro,
  putLivro,
  deleteLivro
};