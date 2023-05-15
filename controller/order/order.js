const expressAsyncHandler = require("express-async-handler")
const connection = require("../../database/connect")
const { v4 } = require("uuid")

const order= {
    get: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute(`SELECT *, CONCAT('[', GROUP_CONCAT(CONCAT('{"dish_name":"', dish.dish_name, '","price":', dish.dish_price, '}')), ']') AS menu_dishes FROM menu_dish INNER JOIN menu ON menu_dish.menu_id = menu.menu_id INNER JOIN dish ON dish.dish_id = menu_dish.dish_id GROUP BY menu.menu_id `)
            return res.status(200).json(rows)
            
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }),
    newOrderRequest: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("INSERT INTO order_request(order_request_id, user_name, phone, email , deposit, time_created) VALUES(?, ?, ?, ?, ?, ?)", [v4(), req.body.user_name, req.body.phone, req.body.email, req.body.deposit=== true ? 1 : 0, new Date()])
            return res.status(200).json({add: true})
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }),
    getOrderRequest: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("SELECT *, order_request_id AS id FROM order_request")
            return res.status(200).json(rows)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    })
}

module.exports= order