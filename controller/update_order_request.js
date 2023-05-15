const expressAsyncHandler = require("express-async-handler");
const connection = require("../database/connect");

const update_order_request= expressAsyncHandler(async (req, res)=> {
    try {
        const [rows]= await connection.execute("UPDATE order_request SET user_name= ?, phone= ?, email= ?, deposit= ? WHERE order_request_id= ?",[req.body.user_name, req.body.phone, req.body.email, req.body.deposit, req.body.order_request] )
        return res.status(200).json({update: true})
    } catch (error) {
        return res.status(201).json(error)
    }
})

module.exports= update_order_request