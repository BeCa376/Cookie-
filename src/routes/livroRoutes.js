const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');

// Importamos os DOIS middlewares
const { verificaToken, verificaAdmin } = require('../middlewares/authMiddleware');

// === Rotas Públicas ===

// CORRIGIDO: de .listarTodos para .getAllLivros
router.get('/', livroController.getAllLivros);

// CORRIGIDO: de .buscarporId para .getLivroById
router.get('/:id', livroController.getLivroById);


// === Rotas Protegidas ===

// CORRIGIDO: de .criar para .createLivro
router.post('/', verificaToken, verificaAdmin, livroController.createLivro);

// CORRIGIDO: de .atualizar para .updateLivro
router.put('/:id', verificaToken, verificaAdmin, livroController.updateLivro);

// CORRIGIDO: de .deletar para .deleteLivro
router.delete('/:id', verificaToken, verificaAdmin, livroController.deleteLivro);

module.exports = router;