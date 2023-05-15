const expressAsyncHandler = require("express-async-handler")
const connection = require("../database/connect")
const {v4} = require("uuid")

const add_staff= expressAsyncHandler(async (req, res)=> {
    const [rows]= await connection.execute("INSERT INTO user(id_user, first_name, last_name, email, password, role) VALUES(?, ?, ?, ?, ?, ?)", [v4(), req.body.firstName, req.body.lastName, req.body.email, req.body.password, 2])
    return res.status(200).json({add: true})
})

module.exports= add_staff