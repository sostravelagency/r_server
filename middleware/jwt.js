const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const jwtInit= (user)=> {
    const accessToken= jwt.sign(user, process.env.JWT_SECRET_KEY)
    return accessToken
}

const verifyToken= expressAsyncHandler(async (req, res, next)=> {
    const token= req.token
    jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, decoded) {
        if(err) {
            return res.status(401).json({message: "Not authorized"})
        }
        next()
    })
})

module.exports= {
    jwtInit,
    verifyToken
}