const express = require("express");

const livroRoutes = require("./routes/livroRoutes.js");
const usuarioRoutes = require("./routes/usuarioRoutes.js");
const sequelize = require('../database');
const Livro = require('./Models/livro');

const port = 8000;

const app = express();

app.use(express.json());

async function syncDatabase() {
    try {
        await sequelize.sync();
        console.log('Modelos sincronizados com o banco de dados.');
    } catch (error) {
        console.error('Erro ao sincronizar modelos:', error);
    }
}
syncDatabase();


app.use("/api/livros", livroRoutes);
app.use("/api/usuarios", usuarioRoutes);

app.get('/', (req, res) => {
  res.send('API Catálogo de livros funcionando!');
});

app.listen(port, () => {
  module.exports = app;
});


async function syncDatabase() {
    try {
        
        await sequelize.sync();
        console.log('Modelos sincronizados com o banco de dados.');
    } catch (error) {
        console.error('Erro ao sincronizar modelos:', error);
    }
}
syncDatabase();

module.exports = app;