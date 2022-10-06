const sequelize = require('../config/database');
const product = require('../model/products');
const user = require('../model/user');
const cart = require('../model/cart');
const itemCart = require('../model/itemCart');

cart.hasMany(itemCart)
itemCart.belongsTo(cart)

user.hasOne(cart)
cart.belongsTo(user)

sequelize.sync({
    force: false
})
