const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Department = require('./Department');

const Employee = sequelize.define('Employee', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El nombre no puede ser nulo'
            }
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El apellido no puede ser nulo'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'El correo electrónico no puede ser nulo'
            },
            isEmail: {
                msg: 'Debe ser una dirección de correo electrónico válida'
            }
        }
    },
    phone: {
        type: DataTypes.STRING,
        validate: {
            isNumeric: {
                msg: 'El número de teléfono debe ser numérico'
            }
        }
    },
    hireDate: {
        type: DataTypes.DATE,
        validate: {
            isDate: {
                msg: 'La fecha de contratación debe ser una fecha válida'
            }
        }
    },
    position: {
        type: DataTypes.STRING
    },
    salary: {
        type: DataTypes.DECIMAL(10, 2),
        validate: {
            isDecimal: {
                msg: 'El salario debe ser un número decimal'
            }
        }
    },
    departmentId: {
        type: DataTypes.INTEGER,
        references: {
            model: Department,
            key: 'id'
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: true
});

Employee.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });

module.exports = Employee;
