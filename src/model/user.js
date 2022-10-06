const sequelize = require('../config/database');
const Sequelize = require('sequelize');

const user = sequelize.define('users', {
    user: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = user