const sequelize = require('../config/database');
const Sequelize = require('sequelize')

const products = sequelize.define('products', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    subtitle: {
       type: Sequelize.STRING,
       allowNull: false  
    },
    price: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.ENUM('eletrônico', 'livro', 'casa', 'móveis', 'eletrodoméstico', 'música'),
        allowNull: false
    }
})

module.exports = products;
