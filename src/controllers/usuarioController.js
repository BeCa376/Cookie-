const {
  getTodosUsuarios,
  getUsuarioForID,
  postNovoUsuario,
  putUsuarioAtualizado,
  deleteID,
} = require("../services/usuarios.js");

// Controlador: retorna a lista completa de usuários.
// Rota: GET /usuarios
function getUsuarios(req, res) {
  try {
    const usuarios = getTodosUsuarios();
    res.status(200).send(usuarios);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Controlador: retorna um único usuário identificado por ID.
// Rota: GET /usuarios/:id
function getUsuario(req, res) {
  try {
    const id = req.params.id;
    const usuario = getUsuarioForID(id);
    res.status(200).send(usuario);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Controlador: cria um novo usuário com base no body da requisição.
// Rota: POST /usuarios
function postUsuario(req, res) {
  try {
    const usuarioNovo = req.body;
    postNovoUsuario(usuarioNovo);
    res.status(201).send("Usuário adicionado com sucesso");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Controlador: atualiza um usuário existente por ID usando o body da requisição.
// Rota: PUT /usuarios/:id
function putUsuario(req, res) {
  try {
    const id = req.params.id;
    const body = req.body;
    putUsuarioAtualizado(body, id);
    res.status(200).send("Usuário atualizado com sucesso");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Controlador: remove um livro por ID.
// Rota: DELETE /usuarios/:id
// Observação: aqui a função chama o service `deleteID` e retorna 200.
function deleteUsuario(req, res) {
  try {
    const id = deleteID(req.params.id);
    res.status(200).send(`Usuário com ID ${id} deletado com sucesso`);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

module.exports = {
  getUsuarios,
  getUsuario,
  postUsuario,
  putUsuario,
  deleteUsuario,
};
