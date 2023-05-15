const expressAsyncHandler = require("express-async-handler");
const connection = require("../database/connect");

const delete_contact= expressAsyncHandler(async (req, res)=> {
    try {
        const [rows]= await connection.execute("DELETE FROM request_booking WHERE request_booking= ?", [req.body.request_id])
        return res.status(200).json({delete: true})
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports= delete_contact