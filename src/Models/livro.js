const { DataTypes } = require('sequelize');
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

// Define o Modelo 'Produto'
const livro = sequelize.define('livro', {
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false // Garante que este campo não pode ser nulo
    },
    preco: {
        type: DataTypes.REAL,
        allowNull: false
    }
},
{
    // Opções do Modelo

    // 1. Mapeia para o nome da tabela 'produtos'
    tableName: 'livros',

    // 2. Desabilita os campos 'createdAt' e 'updatedAt' que o Sequelize
    // adiciona por padrão, pois não tem na tabela.
    timestamps: false
});

module.exports = livro;
