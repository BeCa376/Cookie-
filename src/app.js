const express = require("express");
const cors = require("cors");
const sequelize = require("./database");

// Rotas
const livroRoutes = require("./routes/livroRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Sincronizar banco apenas uma vez
async function syncDatabase() {
    try {
        await sequelize.sync();
        console.log("Modelos sincronizados com o banco de dados.");
    } catch (error) {
        console.error("Erro ao sincronizar modelos:", error);
    }
}
syncDatabase();

// Rotas principais
app.use("/api/livros", livroRoutes);
app.use("/api/usuarios", usuarioRoutes);

// Rota inicial
app.get("/", (req, res) => {
    res.send("API Catálogo de Livros funcionando!");
});

module.exports = app;
