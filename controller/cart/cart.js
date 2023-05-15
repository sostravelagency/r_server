const expressAsyncHandler = require("express-async-handler")
const connection = require("../../database/connect")

const cart= {
    add: expressAsyncHandler(async (req, res)=> {
        const [rows]= await connection.execute("INSERT INTO ")
    }),
    get: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("SELECT * FROM cart LEFT JOIN banquet_hall ON banquet_hall.banquet_hall_id = cart.banquet_hall_id LEFT JOIN menu ON menu.menu_id = cart.menu_id LEFT JOIN dish ON dish.dish_id = cart.dish_id WHERE user_id= ?", [req.query.user_id])
            return res.status(200).json(rows)

        } catch (error) {
            return res.status(500).json(error)
        }
    })
}

module.exports= cart