const expressAsyncHandler = require("express-async-handler")
const { v4 } = require("uuid")
const connection = require("../../database/connect")

const book= {
    bookBanquetHall: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("SELECT * FROM banquet_hall WHERE is_locked= 1 AND banquet_hall_id= ?", [req.body.banquet_hall_id])
            if(rows.length > 0) {
                return res.status(500).json({status: 500, message: "Sảnh này đã có người đặt, Bạn vui lòng chọn sảnh khác"})
            }
            else {
                const [rows1]= await connection.execute("UPDATE banquet_hall SET id_user_booking= ?, is_locked= 1 WHERE banquet_hall_id =?", [req.body.user_id, req.body.banquet_hall_id])
                const [rows2]= await connection.execute("INSERT INTO bill(bill_id, user_id, banquet_hall_id, menu_id, dish_id, time_booking) VALUES(?, ?, ?, ?, ?, ?)", [v4(), req.body.user_id, req.body.banquet_hall_id, "", "", new Date()])
                const [rows3]= await connection.execute("INSERT INTO cart(user_id, cart_id, banquet_hall_id, time_created, order_id) VALUES(?, ?, ?, ?, ?)", [req.body.user_id, v4(), req.body.banquet_hall_id, new Date(), req.body.order_id])
                return res.status(200).json({status: 200, message: "Đặt sảnh thành công"})
            }
            
        } catch (error) {
            return res.status(500).json({error, message: "Error"})
        }
    }),
    bookDish: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("SELECT * FROM cart WHERE dish_id= ? AND order_id= ?", [req.body.dish_id, req.body.order_id])
            if(rows.length> 0) {
                const [rows1]= await connection.execute("UPDATE cart SET amount_dish= amount_dish + ? WHERE dish_id= ? AND order_id= ?", [req.body.amount, req.body.dish_id, req.body.order_id])
                return res.status(200).json({status: 200, message: "Đặt món thành công"})
            }
            else {
                const [rows2] =await connection.execute("INSERT INTO cart(user_id, dish_id, cart_id, amount_dish, time_created, order_id) VALUES(?, ?, ?, ?, ?, ?)", [req.body.user_id, req.body.dish_id, v4(), req.body.amount, new Date(), req.body?.order_id || ""])
                return res.status(200).json({status: 200, message: "Đặt món thành công"})
            }
        } catch (error) {
            return res.status(500).json({error, message: "Error"})
        }
    }),
    bookMenu: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("SELECT * FROM cart WHERE menu_id= ? AND order_id= ?", [req.body.menu_id, req.body.order_id || ""])
            if(rows.length> 0) {
                const [rows1]= await connection.execute("UPDATE cart SET amount_menu= amount_menu + ? WHERE menu_id= ? AND order_id= ?", [req.body.amount, req.body.menu_id, req.body.order_id || ""])
                return res.status(200).json({status: 200, message: "Đặt menu thành công"})
            }
            else {
                const [rows2] =await connection.execute("INSERT INTO cart(user_id, menu_id, cart_id, amount_menu, time_created, order_id) VALUES(?, ?, ?, ?, ?, ?)", [req.body.user_id, req.body.menu_id, v4(), req.body.amount, new Date(), req.body.order_id || ""])
                return res.status(200).json({status: 200, message: "Đặt menu thành công"})
            }
        } catch (error) {
            return res.status(500).json({error, message: "Error"})
        }
    }),
}

module.exports= book