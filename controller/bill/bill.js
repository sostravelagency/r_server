const expressAsyncHandler = require("express-async-handler")
const connection = require("../../database/connect")

const bill= {
    getBill: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("SELECT * FROM cart INNER JOIN order_request ON order_request.order_request_id = cart.order_id LEFT JOIN dish ON dish.dish_id = cart.dish_id LEFT JOIN menu ON menu.menu_id = cart.menu_id LEFT JOIN banquet_hall ON banquet_hall.banquet_hall_id = cart.banquet_hall_id WHERE order_request.order_request_id= ?", [req.query?.order_id])
            return res.status(200).json(rows)
            
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    })
}

module.exports= bill