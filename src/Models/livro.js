const { DataTypes } = require('sequelize');
const db = require('../../database'); 

const Livro = db.define('Livro', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    autor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genero: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    ano: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    preco: {
        type: DataTypes.FLOAT, 
        allowNull: false
    }
},
{
    tableName: 'livros', 
    timestamps: false
});

module.exports = Livro;