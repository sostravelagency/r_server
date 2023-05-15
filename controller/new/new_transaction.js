const expressAsyncHandler = require("express-async-handler")
const connection = require("../../database/connect")

const new_transaction= expressAsyncHandler(async (req, res)=> {
    try {
        const [rows]= await connection.execute("SELECT * FROM user WHERE role= 1 ORDER BY id DESC LIMIT 5")
        return res.status(200).json(rows)
        
    } catch (error) {
        return res.status(200).json(error)
    }
})

module.exports= new_transaction