// Arquivo principal do servidor Express
// - configura o app, middleware e registra as rotas de livros
const express = require("express");

// Importa as rotas do recurso 'livros'
const Livros = require("./routers/livros.js");
const Usuarios = require("./routers/usuarios.js");

// Porta onde o servidor vai escutar (8000 para backend)
const port = 8000;

// Cria a instância do Express
const app = express();

// Middleware: habilita parsing de JSON no corpo das requisições
app.use(express.json());

// Registra as rotas: todas as rotas em routers
app.use("/livros", Livros);
app.use("/usuarios", Usuarios);

// Inicia o servidor
app.listen(port, () => {
  console.log(`escutando a porta ${port}`);
});
