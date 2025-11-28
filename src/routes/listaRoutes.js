const express = require("express");
const router = express.Router();
const controller = require("../controller/listaController");

// Aula completa — todos os métodos:

router.get("/foreach", controller.listarComForEach);

router.get("/filter/:categoria", controller.filtrarPorCategoria);

router.get("/find/:id", controller.buscarPorId);

router.get("/map/desconto", controller.aplicarDesconto);

router.get("/map/titulos", controller.listarTitulos);

router.get("/reduce/total", controller.calcularTotal);

router.post("/spread/add", controller.adicionarLivro);

router.put("/spread/update/:id", controller.atualizarPreco);

router.get("/destruct", controller.desestruturar);

module.exports = router;
