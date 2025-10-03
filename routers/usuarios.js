const { Router } = require("express");
const {
  getUsuarios,
  getUsuario,
  postUsuario,
  putUsuario,
  deleteUsuario,
} = require("../controllers/usuarios.js");

const router = Router();

// Solicitar todos os usuários (GET /usuarios)
router.get("/", getUsuarios);

// Solicitar um usuário por ID (GET /usuarios/:id)
router.get("/:id", getUsuario);

// Adicionar um novo usuário (POST /usuarios)
router.post("/", postUsuario);

// Atualizar um usuário existente (PUT /usuarios/:id)
router.put("/:id", putUsuario);

// Deletar um usuário (DELETE /usuarios/:id)
router.delete("/:id", deleteUsuario);

module.exports = router;
