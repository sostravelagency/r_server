const expressAsyncHandler = require("express-async-handler");
const connection = require("../database/connect");

const get_list_blog= expressAsyncHandler(async (req, res)=> {
    try {
        const [rows]= await connection.execute("SELECT * FROM blogs")
        return res.status(200).json(rows)
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports= get_list_blog