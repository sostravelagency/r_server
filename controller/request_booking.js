const expressAsyncHandler = require("express-async-handler")
const connection = require("../database/connect")
const { v4 } = require("uuid")

const request_booking= expressAsyncHandler(async (req, res)=>{ 
    try {
        const [rows]= await connection.execute("INSERT INTO request_booking(request_booking, username, email, phone, guest, request_detail, time_created) VALUES(?, ?, ?, ?, ?, ?, ?)", [v4(), req.body?.userName || "", req.body?.email || "", req.body?.phone || "", req.body?.guest || "", req.body?.type || "", new Date()])
        return res.status(200).json({add: true})
        
    } catch (error) {
        return res.status(500).json(error)
    }

})

module.exports= request_booking