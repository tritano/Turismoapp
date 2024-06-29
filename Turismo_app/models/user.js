const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/db.config.js');

const User = sequelize.define('User', {
    // Definición de atributos omitida por brevedad
});

// Método para crear un usuario con transacción
User.createWithTransaction = async function(userData) {
    let transaction;
    try {
        // Iniciar una transacción
        transaction = await sequelize.transaction();

        // Crear el usuario dentro de la transacción
        const user = await User.create(userData, { transaction });

        // Completar la transacción
        await transaction.commit();

        return user;
    } catch (error) {
        // Revertir la transacción si hay un error
        if (transaction) await transaction.rollback();
        throw error;
    }
};

// Método para actualizar un usuario con transacción
User.prototype.updateWithTransaction = async function(updatedData) {
    let transaction;
    try {
        // Iniciar una transacción
        transaction = await sequelize.transaction();

        // Actualizar el usuario dentro de la transacción
        await this.update(updatedData, { transaction });

        // Completar la transacción
        await transaction.commit();

        return this;
    } catch (error) {
        // Revertir la transacción si hay un error
        if (transaction) await transaction.rollback();
        throw error;
    }
};

// Método para comparar contraseñas hasheadas
User.prototype.comparePassword = function(candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
};

module.exports = User;
