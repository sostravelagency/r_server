const md5 = require("md5")
const connection = require("../database/connect")
const expressAsyncHandler= require('express-async-handler')

const login= expressAsyncHandler(async (req, res)=> {
    try {
        const {email, password }= req.body
        const [rows]= await connection.execute("SELECT id_user, role FROM user WHERE email= ? AND password= ?", [email, md5(password)])
        if(rows.length > 0) {
            if(parseInt(rows[0]?.role) === 3) {
                return res.status(200).json({auth: true, id_user: rows[0].id_user, isAdmin: true, role: rows[0].role, login: true})
            }
            else if(parseInt(rows[0]?.role) === 2) {
                return res.status(200).json({auth: true, id_user: rows[0].id_user, isEmployee: true, role: rows[0].role, login: true})

            }
            return res.status(200).json({login: true, id_user: rows[0].id_user, role: rows[0].role})
        }
        else {
            return res.status(200).json({login: false})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
    
})

module.exports= login