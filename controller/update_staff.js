const connection = require("../database/connect");

const update_staff= async (req, res)=> {
    try {
        const [rows]= await connection.execute("UPDATE user SET first_name= ?, last_name= ?, email= ? WHERE id_user= ?", [req.body.first_name, req.body.last_name, req.body.email, req.body.user_id])
        return res.status(200).json({update: true})
        
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports= update_staff