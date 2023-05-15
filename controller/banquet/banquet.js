const expressAsyncHandler = require("express-async-handler")
const { v4 } = require("uuid")
const connection = require("../../database/connect")

const banquet= {
    get: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("SELECT *, banquet_hall_id AS id FROM banquet_hall LEFT JOIN user ON user.id_user= banquet_hall.id_user_booking")
            return res.status(200).json(rows)
            
        } catch (error) {   
            return res.status(500).json(error)
        }
    }),
    add: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows1]= await connection.execute("SELECT * FROM banquet_hall WHERE banquet_hall_name= ?", [req.body.banquet_hall_name])
            if(rows1.length > 0) {
                return res.status(200).json({message: "Tên sảnh đã tồn tại, Vui lòng đặt tên sảnh khác", status: 500})
            }
            else {
                const [rows]= await connection.execute("INSERT INTO banquet_hall(banquet_hall_id, banquet_hall_name, time_start, time_end, is_locked, service_guest, price) VALUES(?, ?, ?, ?, ?, ?, ?)", [v4(), req.body.banquet_hall_name, req.body.time_start, req.body.time_end, 0, req.body.service_guest, req.body.price])
                return res.status(200).json({message: "Tạo sảnh thành công", status: 200})
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Lỗi không xác định", status: 500})
        }
    }),
    update: expressAsyncHandler(async (req, res)=> {
        try {
            if(req.body?.time?.length <= 0) {
                const [rows]= await connection.execute("UPDATE banquet_hall SET banquet_hall_name= ?, service_guest= ?, price= ? WHERE banquet_hall_id= ?", [req.body.banquet_hall_name, req.body.service_guest, req.body.price, req.body.banquet_hall_id])
                return res.status(200).json({update: true}) 
            }
            else {
                const [rows]= await connection.execute("UPDATE banquet_hall SET banquet_hall_name= ?, time_start= ?, time_end= ?, service_guest= ?, price= ? WHERE banquet_hall_id= ?", [req.body.banquet_hall_name, req.body.time_start, req.body.time_end, req.body.service_guest, req.body.price, req.body.banquet_hall_id])
                return res.status(200).json({update: true}) 
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    }),
    delete: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("DELETE FROM banquet_hall WHERE banquet_hall_id= ?", [req.body.banquet_id])
            return res.status(200).json({delete: true})
        } catch (error) {
            return res.status(500).json(error)
        }
    }),
    getDetail: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("SELECT *, banquet_hall_id AS id FROM banquet_hall WHERE banquet_hall_id= ?", [req.query.banquet_hall_id])
            return res.status(200).json(rows[0])
        } catch (error) {
            return res.status(500).json(error)
        }
    })
}

module.exports= banquet