const { Sequelize } = require('sequelize');

const sequelizeCouchDB = new Sequelize('database_couchdb', 'tritan', 'tritan', {
  host: 'localhost',
  dialect: 'couchdb'
});

module.exports = sequelizeCouchDB;
