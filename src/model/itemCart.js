const sequelize = require('../config/database');
const Sequelize = require('sequelize')

const itemCart = sequelize.define('itemCart', {
    productId: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

module.exports = itemCart;
