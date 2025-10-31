// Arquivo principal do servidor Express
// - configura o app, middleware e registra as rotas de livros
const express = require("express");

// Importa as rotas do recurso 'livros'
const livroRoutes = require("./routes/livroRoutes.js");
const usuarioRoutes = require("./routes/usuarioRoutes.js");

// Porta onde o servidor vai escutar (8000 para backend)
const port = 8000;

// Cria a instância do Express
const app = express();

// Middleware: habilita parsing de JSON no corpo das requisições
app.use(express.json());

// Registra as rotas: todas as rotas em routes
app.use("/livros", livroRoutes);
app.use("/usuarios", usuarioRoutes);

app.get('/', (req, res) => {
  res.send('API Catálogo de livros funcionando!');
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`escutando na porta ${port}`);
});
