const expressAsyncHandler = require("express-async-handler");
const connection = require("../database/connect");

const delete_order_request= expressAsyncHandler(async (req, res)=> {
    try {
        const [rows]= await connection.execute("DELETE FROM order_request WHERE order_request_id= ?", [req.body.order_request])
        return res.status(200).json({delete: true})
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports= delete_order_request