// const md5 = require("md5")
const connection = require("../database/connect")
const expressAsyncHandler= require('express-async-handler')

const auth= expressAsyncHandler(async (req, res)=> {
    try {
        const {id_user }= req.query
        const [rows]= await connection.execute("SELECT id_user, first_name, last_name, email, role FROM user WHERE id_user= ?", [id_user || ""])
        if(rows.length > 0) {
            if(parseInt(rows[0]?.role) === 3) {
                return res.status(200).json({auth: true, id_user: rows[0].id_user, firstName: rows[0].first_name, lastName: rows[0].last_name, email: rows[0].email, isAdmin: true, role: rows[0].role})
            }
            else if(parseInt(rows[0]?.role) === 2) {
                return res.status(200).json({auth: true, id_user: rows[0].id_user, firstName: rows[0].first_name, lastName: rows[0].last_name, email: rows[0].email, isEmployee: true, role: rows[0].role})

            }
            
            return res.status(200).json({auth: true, id_user: rows[0].id_user, firstName: rows[0].first_name, lastName: rows[0].last_name, email: rows[0].email, role: rows[0].role})
        }
        else {
            return res.status(200).json({auth: false})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
    
})

module.exports= auth