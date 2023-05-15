const expressAsyncHandler = require("express-async-handler")
const connection = require("../database/connect")

const user= {
    update: expressAsyncHandler(async (req, res)=> {
        try {
            // eslint-disable-next-line
            const [rows]= await connection.execute("UPDATE user SET first_name= ?, last_name= ?, email= ? WHERE id_user= ?", [req.body.firstName, req.body.lastName, req.body.email, req.body.idUser])
            return res.status(200).json({update: true})
            
        } catch (error) {
            return res.status(500).json({update: false, error})
        }
    })
}

module.exports= user