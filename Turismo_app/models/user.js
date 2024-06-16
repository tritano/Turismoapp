// models/User.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config.js'); // Importa la instancia de Sequelize

// Define el modelo de usuario
const User = sequelize.define('User', {
  // Define las columnas de la tabla
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Opciones adicionales del modelo
  tableName: 'users', // Nombre de la tabla en la base de datos
  timestamps: true, // Habilita la creación automática de campos "createdAt" y "updatedAt"
});

module.exports = User;
