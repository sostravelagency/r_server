const connection = require("../database/connect")
const expressAsyncHandler= require('express-async-handler')
const verifyMail = require("../utils/mail")

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
const forgot_password= expressAsyncHandler(async (req, res)=> {
    try {
        const {email}= req.body
        const [rows]= await connection.execute("SELECT id_user FROM user WHERE email= ?", [email])
        if(rows.length <= 0) {
            return res.status(200).json({forgot_password: false, exist: true})
        }
        
        else {
            const verifyCode= randomIntFromInterval(100000, 999999)
            // eslint-disable-next-line
            const [rows]= await connection.execute("INSERT INTO verify_email VALUES (?, ?) ON DUPLICATE KEY UPDATE code= ?", [email, verifyCode, verifyCode])
            const result= await verifyMail(email, verifyCode)
            return res.status(200).json({...result, verify: "pending"})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
    
})

module.exports= forgot_password