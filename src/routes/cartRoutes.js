const express = require('express');
const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database');
const cartModel = require('../model/cart');
const itemCart = require('../model/itemCart');

const Router = express.Router();

Router.get('/:id', async (req, res)=>{
    try {
        const cart = await cartModel.findOne({where:{userId: req.params.id}})  
        const prod_item = await sequelize.query(`
        select i.id, p.name, p.image, p.price, p.subtitle
        from itemcarts i 
        left join products p on p.id = i.productId 
        where i.cartId= ${cart.id}
        `, { type: QueryTypes.SELECT });
        res.json(prod_item)
    } catch (error) {
        res.json({message: error.stack, success: false})
    }
    
})

Router.post('/', async (req, res)=>{
    try {
        const cart = await cartModel.findOne({where:{userId: req.body.userId}})
            const item = await itemCart.create({
                cartId: cart.id,
                productId: req.body.productId
            })
            res.json({item: item, success: true})
       
    } catch (error) {
        res.json({message: error.stack, success: false})
    }
})

Router.delete('/:id', async (req, res)=>{
    try {
        const item = await itemCart.destroy({where:{ id: req.params.id}})
        res.json({success: true, item: item})
    } catch (error) {
        res.json({message: error.stack, success: false})
    }
    
})

module.exports = Router;
