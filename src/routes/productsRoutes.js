const express = require('express')
const products = require('../model/products')
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function(req, file, callback) {
      callback(null, file.originalname);
    }
  });
const upload = multer({ storage: storage })

const Router = express.Router()

Router.get('/', async (req, res)=>{
    try {
        const productsGet = await products.findAll()
        res.json(productsGet)
    } catch (error) {
        res.json({message: error.stack})
    }
})

Router.get('/category/:category', async (req, res)=>{
    try {
        const productsCategory = await products.findAll({where: {category: req.params.category}})
        res.json(productsCategory)
    } catch (error) {
        res.json({message: error.stack})
    }
})

Router.get('/:id', async (req, res)=>{
    try {
        const product = await products.findOne({where: {id: req.params.id}})
        res.json(product)
    } catch (error) {
        res.json({message: error.stack})
    }
})

Router.post('/', upload.single('img'), async (req, res)=>{
    try {
        const product = await products.create({
            name: req.body.name,
            subtitle: req.body.subtitle,
            price: req.body.price,
            image: req.file.originalname,
            category: req.body.category
        })
        res.json({success: true, product: product})
    } catch (error) {
        res.json({message: error.stack})
    }
})

Router.delete('/:id', async (req, res)=>{
    try {
        const product = await products.destroy({where: {id: req.params.id}})
        res.json({success: true, product: product})
    } catch (error) {
        res.json({success: false, messsage: error.stack})
    }
})


module.exports = Router;