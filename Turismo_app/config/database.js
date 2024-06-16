const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('turismo', 'root', 'tritan', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
