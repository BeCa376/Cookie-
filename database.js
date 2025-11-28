//const sqlite3 = require('sqlite3').verbose();
//const DBSOURCE = "biblioteca.db";
//const { Sequelize } = require('sequelize');

//const db = new sqlite3.Database(DBSOURCE, (err) => {
//  if (err) {
//       console.error(err.message);
//       throw err;
//   } else {
//     console.log('Conectado ao banco SQLite.');
//   db.run(`CREATE TABLE IF NOT EXISTS livros (
//          id INTEGER PRIMARY KEY AUTOINCREMENT,
 //           titulo VARCHAR(150) NOT NULL,
  //          autor VARCHAR(100) NOT NULL,
  //          genero VARCHAR(50) NOT NULL,
   //         ano_publicacao INTEGER NOT NULL
   //     )`, (err) => {
    //       if (err) {
    //            console.error("Erro ao criar tabela 'livros':", err.message);
     //       } else {
     //           const insert = `
     //               INSERT OR IGNORE INTO livros (id, titulo, autor, genero, ano_publicacao)
     //               VALUES (?, ?, ?, ?, ?)
     //           `;
     //           db.run(insert, [1, "O Senhor dos Anéis", "J.R.R. Tolkien", "Fantasia", 1954]);
     //           db.run(insert, [2, "1984", "George Orwell", "Distopia", 1949]);
      //          db.run(insert, [3, "O Guia do Mochileiro das Galáxias", "Douglas Adams", "Ficção Científica", 1979]);
      //      }
       // });
    //}
//});

//module.exports = db;

//const sequelize = new Sequelize({
   // dialect: 'sqlite',
   // storage: 'biblioteca.db'
//});
//async function testConnection() {
  //  try {
    //    await sequelize.authenticate();
      //  console.log('Conexão com o Sequelize (SQLite) estabelecida com sucesso.');
   // } catch (error) {
     //   console.error('Não foi possível conectar ao banco de dados:', error);
    //}
//}

//testConnection();

//module.exports = sequelize;

// database.js (NOVA VERSÃO)
const { Sequelize } = require('sequelize');

// Instancia o Sequelize para conectar ao banco SQLite
// O 'storage' aponta para o mesmo arquivo 'biblioteca.db' 
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'biblioteca.db'
});

// Testa a conexão (opcional)
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o Sequelize (SQLite) estabelecida com sucesso.');
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados:', error);
    }
}

testConnection();

module.exports = sequelize;