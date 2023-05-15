const connection = require("../database/connect")
const cron = require('node-cron');

const deleteData= async ()=> {
    const [rows]= await connection.execute("DELETE FROM order_request")
    const [rows1]= await connection.execute("DELETE FROM request_booking")
}

const refreshOrder= cron.schedule("0 0 * * *", ()=> {
    deleteData()
})

module.exports= refreshOrder