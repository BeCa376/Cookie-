
const db = require('../database.js');

const livroModel = {

    // Buscar todos
    findAll: () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM livros", [], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    },

    // Buscar por ID
    findById: (id) => {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM livros WHERE id = ?", [id], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    },

    // Criar novo
    create: (titulo, autor, genero, ano_publicacao) => {
        return new Promise((resolve, reject) => {
            db.run(
                "INSERT INTO livros (titulo, autor, genero, ano_publicacao) VALUES (?, ?, ?, ?)",
                [titulo, autor, genero, ano_publicacao],
                function (err) {
                    if (err) reject(err);
                    resolve({ id: this.lastID, titulo, autor, genero, ano_publicacao });
                }
            );
        });
    },

    // Atualizar
    update: (id, titulo, autor, genero, ano_publicacao) => {
        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE livros
                 SET titulo = ?, autor = ?, genero = ?, ano_publicacao = ?
                 WHERE id = ?`,
                [titulo, autor, genero, ano_publicacao, id],
                function (err) {
                    if (err) reject(err);
                    resolve({ changes: this.changes });
                }
            );
        });
    },

    // Deletar
    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM livros WHERE id = ?", [id], function (err) {
                if (err) reject(err);
                resolve({ changes: this.changes });
            });
        });
    }
};

module.exports = livroModel;
