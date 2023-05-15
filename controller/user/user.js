const expressAsyncHandler = require("express-async-handler")
const connection = require("../../database/connect")

const user2= {
    getAll: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows] =await connection.execute("SELECT id_user AS id, first_name, last_name, email FROM user WHERE role= 1")
            return res.status(200).json(rows)
            
        } catch (error) {
            return res.status(200).json(error)
        }
    }),
    update: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("UPDATE user SET first_name= ?, last_name= ?, email= ? WHERE id_user= ? AND role= 1",[req.body.firstName, req.body.lastName, req.body.email, req.body.user_id])
            return res.status(200).json({update: true})
        } catch (error) {
            return res.status(500).json(error)
        }
    }),
    delete: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("DELETE FROM user WHERE id_user= ? AND role= 1", [req.body.user_id])
            return res.status(200).json(rows)
        } catch (error) {
            return res.status(500).json(error)
        }
    })
}

module.exports= user2