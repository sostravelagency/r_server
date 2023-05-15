const expressAsyncHandler = require("express-async-handler");
const connection = require("../database/connect");

const get_detail_news= expressAsyncHandler(async (req, res)=> {
    try {
        const [rows]= await connection.execute("SELECT * FROM blogs WHERE id= ?", [req.query.blog_id])
        return res.status(200).json(rows[0])
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports= get_detail_news