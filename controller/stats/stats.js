const expressAsyncHandler = require("express-async-handler")
const connection = require("../../database/connect")
const moment= require("moment")

const stats= {
    statsDate: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("SELECT stats.*, order_request.user_name, order_request.time_created, order_request.time_paid AS time_booking FROM stats INNER JOIN order_request ON order_request.order_request_id = stats.order_id")
            const stats= rows?.filter(item=> moment(item?.time_created).format("DD/MM/YYYY") === req.query?.time)
            return res.status(200).json(stats)        
            
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }),
    statsMonth: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("SELECT stats.*, order_request.user_name, order_request.time_created AS time_booking FROM stats INNER JOIN order_request ON order_request.order_request_id = stats.order_id")
            const stats= rows?.filter(item=> moment(item?.time_created).format("MM/YYYY") === req.query?.time)
            return res.status(200).json(stats)        
            
        } catch (error) {
            return res.status(500).json(error)
        }
    }),
    statsYear: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("SELECT stats.*, order_request.user_name, order_request.time_created AS time_booking FROM stats INNER JOIN order_request ON order_request.order_request_id = stats.order_id")
            const stats= rows?.filter(item=> moment(item?.time_created).format("YYYY") === req.query?.time)
            return res.status(200).json(stats)        
            
        } catch (error) {
            return res.status(500).json(error)
        }
    }),
    statsRange: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("SELECT stats.*, order_request.user_name, order_request.time_created AS time_booking FROM stats INNER JOIN order_request ON order_request.order_request_id = stats.order_id")
            const stats= rows?.filter(item=> moment(item?.time_created).valueOf() >= moment(req.query.time_start, "DD/MM/YYYY").valueOf() && moment(item?.time_created).valueOf() <= moment(req.query.time_end, "DD/MM/YYYY").valueOf())
            return res.status(200).json(stats)        
            
        } catch (error) {
            return res.status(500).json(error)
        }
    })
}

module.exports= stats