const { Router } = require("express");
const {
  getLivros,
  getLivro,
  postLivro,
  putLivro,
  deleteLivro,
} = require("../controllers/livros");

const router = Router();

// Solicitar todos os livros (GET /livros)
router.get("/", getLivros);

// Solicitar um livro por ID (GET /livros/:id)
router.get("/:id", getLivro);

// Adicionar um novo livro (POST /livros)
router.post("/", postLivro);

// Atualizar um livro existente (PUT /livros/:id)
router.put("/:id", putLivro);

// Deletar um livro (DELETE /livros/:id)
router.delete("/:id", deleteLivro);

module.exports = router;
