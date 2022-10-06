const express = require('express');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const productsRoutes = require('../routes/productsRoutes');
const authRoutes = require('../routes/authRoutes');
const userRoutes = require('../routes/userRoutes');
const cartRoutes = require('../routes/cartRoutes');
const database = require('./database');
require('../model/association');

const app = express();

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type',"Cookie","Set-Cookie");
    res.append('Access-Control-Allow-Credentials',"true")
    res.append('Accept', 'application/json');
    next();
});

app.use(express.static('public')); 
app.use('/uploads', express.static('uploads'));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}))
app.use(cookieparser());

app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/products', productsRoutes)
app.use('/cart', cartRoutes)

app.listen(3000)