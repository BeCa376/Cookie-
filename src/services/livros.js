const fs = require("fs");

// Lê e retorna todos os livros do arquivo `livros.json`.
// Retorno: Array de objetos de livro.
function getTodosLivros() {
  return JSON.parse(fs.readFileSync("../json/livros.json"));
}

// Busca um livro por ID no arquivo e retorna o primeiro match.
// Parâmetros:
// - id: string|number (id do livro a ser buscado)
// Retorno: objeto do livro encontrado ou undefined.
function getLivroForID(id) {
  const livros = JSON.parse(fs.readFileSync("../json/livros.json"));
  const filterLivro = livros.filter((livro) => livro.id === id);
  return filterLivro[0];
}

// Adiciona um novo livro ao final da lista e regrava o arquivo.
// Parâmetros:
// - livroNovo: objeto com os campos do livro.
function postNovoLivro(livroNovo) {
  const livros = JSON.parse(fs.readFileSync("../json/livros.json"));
  const livrosAtualizados = [...livros, livroNovo];
  fs.writeFileSync("../json/livros.json", JSON.stringify(livrosAtualizados));
}

// Atualiza os dados de um livro existente por ID.
// Parâmetros:
// - livroAtualizado: objeto com os campos a serem atualizados
// - id: string|number (id do livro a ser atualizado)
// O livro é substituído por uma mescla entre os dados antigos e os novos.
function putLivroAtualizado(livroAtualizado, id) {
  let livros = JSON.parse(fs.readFileSync("../json/livros.json"));
  const index = livros.findIndex((livro) => livro.id === id);
  const atualizacao = { ...livros[index], ...livroAtualizado };
  livros[index] = atualizacao;
  fs.writeFileSync("../json/livros.json", JSON.stringify(livros));
}

// Remove um livro pelo ID e regrava o arquivo com a lista atualizada.
// Parâmetros:
// - id: string|number (id do livro a ser removido)
// Retorno: nada (apenas regrava o arquivo).
function deleteID(id) {
  const livros = JSON.parse(fs.readFileSync("../json/livros.json"));
  const deleteIndex = livros.filter((livro) => livro.id !== id);
  fs.writeFileSync("../json/livros.json", JSON.stringify(deleteIndex));
}

module.exports = {
  getTodosLivros,
  getLivroForID,
  postNovoLivro,
  putLivroAtualizado,
  deleteID,
};
