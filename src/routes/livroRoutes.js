const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');

// Importamos os DOIS middlewares
const { verificaToken, verificaAdmin } = require('../middlewares/authMiddleware');

// === Rotas Públicas (Qualquer um pode ver) ===

// Rota GET para obter todos os livros
router.get('/', livroController.listarTodos);

// Rota GET para obter um livro por ID
router.get('/:id', livroController.buscarporId);


// === Rotas Protegidas (Requerem login e permissão de admin) ===

// Rota POST para criar um novo livro
// 1º verifica o token, 2º verifica se é admin
router.post('/', verificaToken, verificaAdmin, livroController.criar);

// Rota PUT para atualizar um livro
router.put('/:id', verificaToken, verificaAdmin, livroController.atualizar);

// Rota DELETE para deletar um livro
router.delete('/:id', verificaToken, verificaAdmin, livroController.deletar);

module.exports = router;