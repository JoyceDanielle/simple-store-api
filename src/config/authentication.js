const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    try {
        const token = req.cookies.token;
        if(token){
            const decoded = jwt.verify(token, 'encode')
            next()
        }else{
            res.json({message: 'token não enviado', success: false})
        }
    } catch (error) {
        res.json({message: error.message, success: false})
    }
}