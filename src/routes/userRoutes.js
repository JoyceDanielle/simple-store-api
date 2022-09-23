const express = require('express');
const userModel = require('../model/user');
const bcrypt = require('bcrypt')

const Router = express.Router();

Router.get('/', async (req, res)=>{
    try {
        const users = await userModel.findAll()
        res.json(users)
    } catch (error) {
        res.json({message: error.stack, success: false})
    }
})

Router.post('/', async (req, res)=>{
    try {
        const hash = bcrypt.hashSync(req.body.password, 10)
        const user = await userModel.create({
            user: req.body.user,
            password: hash,
            name: req.body.name
        })
        res.json(user)
    } catch (error) {
        res.json({message: error.stack, success: false})
    }
})

Router.put('/', async (req, res)=>{
    try {
        const user = await userModel.update({
            user: req.body.user,
            password: req.body.password,
            name: req.body.name
        },
        {
            where: {id: req.body.id}
        })
        res.json(user)
    } catch (error) {
        res.json({message: error.stack, success: false})
    }
})

Router.delete('/:id', async (req, res)=>{
    try {
        const user = userModel.destroy({where: {id: req.params.id}})
        res.json({message: 'excluido com sucesso', success: true})
    } catch (error) {
        res.json({message: error.stack, success: false})
    }
})

module.exports = Router