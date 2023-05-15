const expressAsyncHandler = require("express-async-handler");
const connection = require("../../database/connect");
const { v4 } = require("uuid");

const dish= {
    get: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("SELECT *, dish_id AS id FROM dish")
            return res.status(200).json(rows)
        } catch (error) {
            return res.status(500).json(error)
        }
    }),
    getDetail: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("SELECT * FROM dish WHERE dish_id =?", [req.query?.dish_id || ""])
            return res.status(200).json(rows[0])
            
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }),
    add: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("INSERT INTO dish(dish_id, dish_name, dish_description, dish_price, image_dish) VALUES(?, ?, ?, ?, ?) ", [v4(), req.body.dish_name, req.body.dish_description, req.body.dish_price, req.body.image])
            return res.status(200).json({add: true})
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }),
    delete: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("DELETE FROM dish WHERE dish_id = ?", [req.body.id])
            return res.status(200).json({delete: true})
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }),
    update: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("UPDATE dish SET dish_name= ?, dish_description= ?, dish_price= ?, image_dish= ? WHERE dish_id= ?", [req.body.dish_name, req.body.dish_description, req.body.dish_price, req.body?.image, req.body.dish_id])
            return res.status(200).json({update: true})
        } catch (error) {
            return res.status(500).json(error)
        }
    })
}

module.exports= dish