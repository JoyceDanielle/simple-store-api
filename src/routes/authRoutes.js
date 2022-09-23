const express = require('express');
const user = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Router = express.Router();

Router.delete('/', async (req, res)=>{
    if(req.cookies.token){
        res.clearCookie('token').json({success: true});
    }
})

Router.get('/', async (req, res)=>{
    try {
        if(req.cookies.token){
            const decoded = jwt.verify(req.cookies.token, 'encode')
            res.json({success: true, usuario: decoded})
        }else{
            res.json({success: false, message: 'token não encontrado'})
        }
    } catch (error) {
        res.json({success: false, message: error.stack})
    }
})

Router.post('/', async (req, res, next)=>{
    try {
        const usuario = await user.findOne({where:{user: req.body.user}})
        if(usuario){
            const isPassword = bcrypt.compareSync(req.body.password, usuario.password)
            if(isPassword){
                const token = jwt.sign({ user: usuario.user, id: usuario.id, name: usuario.name }, "encode", {expiresIn: "24h"})
                if(token){
                    res.cookie("token", token, {httpOnly: true, secure: false}).json({success: true, usuario: usuario})
                    next()
                }
            }else{
                res.json({message: 'senha inválida', success: false})
            }
        }else{
            res.json({message: 'usuário não cadastrado', success: false})
        }
    } catch (error) {
        res.json({message: error.stack, success: false})
    }
})

module.exports = Router