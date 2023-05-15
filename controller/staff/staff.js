const expressAsyncHandler = require("express-async-handler")
const { v4 } = require("uuid")
const connection = require("../../database/connect")

const staff= {
    get: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("SELECT *, id_user as id FROM user WHERE role= 2")
            return res.status(200).json(rows)
            
        } catch (error) {
            return res.status(200).json(error)
        }
    }),
    getDetail: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("SELECT * FROM user WHERE role= 2 AND id_user= ?", [req.query?.staff_id])
            return res.status(200).json(rows[0])
        } catch (error) {
            return res.status(500).json(error)

        }
    }),
    delete: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("DELETE FROM user WHERE role= 2 AND id_user= ?", [req.query?.staff_id])
            return res.status(200).json({delete: true})
        } catch (error) {
            return res.status(500).json(error)

        }
    }),
    add: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("INSERT INTO user(id_user, first_name,  last_name, email, password, role) VALUES(?, ?, ?, ?, ?, ?)", [v4(), req.body.first_name, req.body.last_name, req.body.email, 2])
            return res.status(200).json({add: true})
        } catch (error) {
            return res.status(500).json(error)
        }
    }),
    update: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("UPDATE user SET first_name= ?, last_name= ?, email= ? WHERE id_user= ? AND role= 2", [req.body.first_name, req.body.last_name, req.body.email])
            return res.status(200).json({update: true})
        } catch (error) {
            return res.status(500).json(error)
        }
    })
}

module.exports= staff