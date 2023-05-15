const expressAsyncHandler = require("express-async-handler")
const connection = require("../../database/connect")
const { v4 } = require("uuid")

const menu = {
    get: expressAsyncHandler(async (req, res)=> {
        try {
            if(req.query.category_id) {
                const [rows]= await connection.execute("SELECT * FROM dish INNER JOIN category_dish ON category_dish.dish_id = dish.dish_id INNER JOIN category ON category.category_id = category_dish.category_id WHERE category.category_id = ?", [req.query.category_id])
                return res.status(200).json(rows)

            }
            else {
                const [rows]= await connection.execute("SELECT * FROM dish INNER JOIN category_dish ON category_dish.dish_id = dish.dish_id")
                return res.status(200).json(rows)
            }
            
        } catch (error) {
            return res.status(200).json(error)
        }
    }),
    getMenu: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute(`SELECT menu.*, menu.menu_id AS id, CONCAT('[', GROUP_CONCAT(CONCAT('{dish_name":"', dish.dish_name, '","price":', dish.dish_price, '}')), ']') AS listDish FROM menu LEFT JOIN menu_dish ON menu.menu_id = menu_dish.menu_id LEFT JOIN dish ON dish.dish_id = menu_dish.dish_id GROUP BY menu.menu_id`)
            return res.status(200).json(rows)
        } catch (error) {
            return res.status(200).json(error)
        }
    }),
    update: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("UPDATE menu SET menu_name= ?, menu_description= ?, menu_photo= ? WHERE menu_id= ?", [req.body.menu_name, req.body.menu_description, req.body?.image, req.body.id])
            return res.status(200).json({update: true})
        } catch (error) {
            return res.status(500).json(error)
        }
    }),
    delete: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("DELETE FROM menu WHERE menu_id= ?", [req.body.id])
            return res.status(200).json({delete: true})
        } catch (error) {
            return res.status(500).json(error)
        }
    }),
    add: expressAsyncHandler(async (req, res)=> {
        try {
            const menu_id= v4()
            const [rows]= await connection.execute("INSERT INTO menu(menu_id, menu_name, menu_description, menu_photo) VALUES(?, ?, ?, ?)", [menu_id, req.body.menu_name, req.body.menu_description, req.body.menu_photo?.img])
            req.body?.dishList?.map(async item=> await connection.execute("INSERT INTO menu_dish(menu_id, dish_id) VALUES(?, ?)", [menu_id, item.dish_id]))
            return res.status(200).json({add: true})
        } catch (error) {
            return res.status(500).json(error)
        }
    })
}

module.exports= menu