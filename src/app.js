const express = require("express");

const livroRoutes = require("./routes/livroRoutes.js");
const usuarioRoutes = require("./routes/usuarioRoutes.js");

const port = 8000;

const app = express();

app.use(express.json());

app.use("/api/livros", livroRoutes);
app.use("/api/usuarios", usuarioRoutes);

app.get('/', (req, res) => {
  res.send('API Catálogo de livros funcionando!');
});

app.listen(port, () => {
  console.log(`escutando na porta ${port}`);
});
