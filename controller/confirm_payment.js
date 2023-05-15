const expressAsyncHandler = require("express-async-handler")
const connection = require("../database/connect")

const confirm_payment= expressAsyncHandler(async (req, res)=> {

    try {
        const { listBanquet }= req.body
        listBanquet?.map(item=> connection.execute("UPDATE banquet_hall SET id_user_booking= ?, is_locked= ? WHERE banquet_hall_id= ?", ["", 0, item?.banquet_hall_id]))
        const [rows]= await connection.execute("UPDATE order_request SET paid= 1, time_paid= ? WHERE order_request_id= ?", [new Date(), req.body.order_id])
        const [rows1]= await connection.execute("INSERT INTO stats(revenue, time_created, order_id) VALUES(?, ?, ?)", [req.body.revenue, new Date(), req.body.order_id])
        return res.status(200).json({paid: true})
        
    } catch (error) {
        return res.status(200).json(error)   
    }
})

module.exports= confirm_payment