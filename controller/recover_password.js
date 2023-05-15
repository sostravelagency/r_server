const expressAsyncHandler = require("express-async-handler")
const connection = require("../database/connect")

const recover_password = expressAsyncHandler(async (req, res)=> {
    try {
        const {email, code}= req.body
        const [rows]= await connection.execute("SELECT * FROM verify_email WHERE email= ? AND code= ?", [email, code])
        if(rows.length > 0) {
            const [rows]= await connection.execute("DELETE FROM verify_email WHERE email= ? AND code= ?", [email, code])
            return res.status(200).json({recover: true})
        }
        else {
            return res.status(200).json({recover: false, verify: false})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})

module.exports= recover_password 