const { v4 } = require("uuid")
const connection = require("../database/connect")
const expressAsyncHandler = require("express-async-handler")

const custom_book_dish= expressAsyncHandler(async (req, res)=> {
    try {
        const dish_id= v4()
        console.log(req.body)
        const [rows]= await connection.execute("INSERT INTO dish(dish_id, dish_name, dish_description, dish_price, mode) VALUES(?, ?, ?, ?, ?)", [dish_id, req.body.dishName, req.body.dishDescription, parseInt(req.body.dishPrice), 1])
        const [rows1]= await connection.execute("INSERT INTO cart(user_id, dish_id, cart_id, amount_dish, time_created, order_id) VALUES(?, ?, ?, ?, ?, ?)", [req.body.user_id, dish_id, v4(), req.body.dishAmount, new Date(), req.body.order_id])
        return res.status(200).json({add: true})
    } catch (error) {
        return res.status(500).json(error)
    }

})

module.exports= custom_book_dish