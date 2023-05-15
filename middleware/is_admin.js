const jwt = require('jsonwebtoken');

const is_admin= async (req, res, next)=> {
    const token= req.token
    jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, decoded) {
        if(err) {
            return res.status(401).json({message: "Not authorized"})
        }
        if(decoded?.isAdmin!== true && parseInt(decoded?.role) !== 3) {
            return res.status(403).json({message: "Not permission"})
        } 
        next()
    })
}

module.exports= is_admin