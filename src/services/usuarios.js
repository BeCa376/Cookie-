const fs = require("fs");

// Lê e retorna todos os usuários do arquivo `usuarios.json`.
// Retorno: Array de objetos de usuário.
function getTodosUsuarios() {
  return JSON.parse(fs.readFileSync("../json/usuarios.json"));
}

// Busca um usuário por ID no arquivo e retorna o primeiro match.
// Parâmetros:
// - id: string|number (id do usuário a ser buscado)
// Retorno: objeto do usuário encontrado ou undefined.
function getUsuarioForID(id) {
  const usuarios = JSON.parse(fs.readFileSync("../json/usuarios.json"));
  const filterUsuario = usuarios.filter((usuario) => usuario.id === id);
  return filterUsuario[0];
}

// Adiciona um novo usuário ao final da lista e regrava o arquivo.
// Parâmetros:
// - usuarioNovo: objeto com os campos do usuário.
function postNovoUsuario(usuarioNovo) {
  const usuarios = JSON.parse(fs.readFileSync("../json/usuarios.json"));
  const usuariosAtualizados = [...usuarios, usuarioNovo];
  fs.writeFileSync(
    "../json/usuarios.json",
    JSON.stringify(usuariosAtualizados)
  );
}

// Atualiza os dados de um usuário existente por ID.
// Parâmetros:
// - usuarioAtualizado: objeto com os campos a serem atualizados
// - id: string|number (id do usuário a ser atualizado)
// O usuário é substituído por uma mescla entre os dados antigos e os novos.
function putUsuarioAtualizado(usuarioAtualizado, id) {
  let usuarios = JSON.parse(fs.readFileSync("../json/usuarios.json"));
  const index = usuarios.findIndex((usuario) => usuario.id === id);
  const atualizacao = { ...usuarios[index], ...usuarioAtualizado };
  usuarios[index] = atualizacao;
  fs.writeFileSync("../json/usuarios.json", JSON.stringify(usuarios));
}

// Remove um usuário pelo ID e regrava o arquivo com a lista atualizada.
// Parâmetros:
// - id: string|number (id do usuário a ser removido)
// Retorno: nada (apenas regrava o arquivo).
function deleteID(id) {
  const usuarios = JSON.parse(fs.readFileSync("../json/usuarios.json"));
  const deleteIndex = usuarios.filter((usuario) => usuario.id !== id);
  fs.writeFileSync("../json/usuarios.json", JSON.stringify(deleteIndex));
}

module.exports = {
  getTodosUsuarios,
  getUsuarioForID,
  postNovoUsuario,
  putUsuarioAtualizado,
  deleteID,
};
