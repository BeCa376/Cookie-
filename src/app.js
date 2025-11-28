const express = require("express");

const livroRoutes = require("./routes/livroRoutes.js");
const usuarioRoutes = require("./routes/usuarioRoutes.js");

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

const sequelize = require('./database'); // Importa a conexão
const Produto = require('./models/produto'); // Importa o modelo
async function syncDatabase() {
    try {
        // .sync() verifica o estado dos modelos e os cria/altera no BD se necessário
        await sequelize.sync();
        console.log('Modelos sincronizados com o banco de dados.');
    } catch (error) {
        console.error('Erro ao sincronizar modelos:', error);
    }
}
syncDatabase();