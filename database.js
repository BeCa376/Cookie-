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

if (require.main === module) {
    testConnection();
}

module.exports = sequelize;