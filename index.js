const express= require("express")
const cors= require("cors")
const http= require("http")
const router = require("./route/route")
const refreshOrder = require('./cronjob/cronjob');
require('dotenv').config()
const app= express()
const httpServer= http.createServer(app)
app.use(cors())
app.use(function(req, res, next) {
    const authHeader= req.headers.authorization
    if(authHeader) {
        const token= authHeader.split(" ")[1]
        req.token= token
    }
    next()
})
app.use(express.static(__dirname+ "/assets"))
app.use(express.json())
app.use(router)
app.use(express.urlencoded({
    extended: true
}))
refreshOrder.start()

httpServer.listen(4000, ()=> console.log("Server run port 4000"))