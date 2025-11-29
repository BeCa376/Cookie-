const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');

const { verificaToken, verificaAdmin } = require('../middlewares/authMiddleware');

// === Rotas Públicas ===


router.get('/', livroController.getAllLivros);

router.get('/:id', livroController.getLivroById);


router.post('/', verificaToken, verificaAdmin, livroController.createLivro);

router.put('/:id', verificaToken, verificaAdmin, livroController.updateLivro);

router.delete('/:id', verificaToken, verificaAdmin, livroController.deleteLivro);

module.exports = router;