const Sequelize = require('sequelize')

const sequelize = new Sequelize("store", "root", "1234", {
    host: "localhost",
    dialect: "mysql",
    raw: true
});

module.exports = sequelize