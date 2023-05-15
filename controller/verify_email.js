const expressAsyncHandler = require("express-async-handler")
const md5 = require("md5")
const { v4 } = require("uuid")
const connection = require("../database/connect")

const verify_mail= expressAsyncHandler(async (req, res)=> {
    try {
        const {email, password, firstName, lastName, code}= req.body
        const [rows]= await connection.execute("SELECT * FROM verify_email WHERE email= ? AND code= ?", [email, code])
        if(rows.length > 0) {
            // eslint-disable-next-line
            const [rows]= await connection.execute("DELETE FROM verify_email WHERE email= ? AND code= ?", [email, code])
            // eslint-disable-next-line
            const [rows1]= await connection.execute("INSERT INTO user VALUES(?, ?, ?, ?, ?, ?)", [v4(), firstName, lastName, email, md5(password), 1])
            return res.status(200).json({signup: true, redirect: "/login"})
        }
        else {
            return res.status(200).json({signup: false, verify: false})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})

module.exports= verify_mail