const express = require("express");
const livroRoutes = require("./routes/livroRoutes.js");
const usuarioRoutes = require("./routes/usuarioRoutes.js");

const sequelize = require('../database'); 

const port = 3000;
const app = express();

app.use(express.json());

async function syncDatabase() {
    try {
        await sequelize.sync({ alter: true });
        console.log('Banco de dados sincronizado com sucesso (Tabelas Criadas/Atualizadas).');
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados:', error);
    }
}

syncDatabase();

// Rotas
app.use("/api/livros", livroRoutes);
app.use("/api/usuarios", usuarioRoutes);

app.get('/', (req, res) => {
  res.send('API Catálogo de livros funcionando!');
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;