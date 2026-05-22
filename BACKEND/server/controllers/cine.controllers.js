import {pool} from "../db.js"

export const getCines = async (req,res) =>{
    try {
        const [result] = await pool.query("SELECT * FROM cine")
        if (result.length === 0) {
            res.status(404).json({message: "No hay Cines para Mostrar"})
        }
        res.json(result)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export const createCines = async (req,res)=>{
    try {
        const {idciudad, cine} = req.body
        const [result] = await pool.query("INSERT INTO cine (idciudad, cine) VALUES (?,?)",[idciudad, cine])

        if (result.length === 0) {
            res.status(400).json({message: "Error al Crear el Cine"})
        }
        res.json({insertID: result.insertId})
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export const deleteCines = async (req,res)=>{
    try {
        const {idcine} = req.params
        const [result] = await pool.query("DELETE FROM cine WHERE idcine=?",[idcine])
        if (result.affectedRows === 0) {
            res.status(400).json({message: "No se pudo Eliminar el Cine"})
        }
        res.json({message: "El cine se elimino Correctamente"})
    } catch (error) {
        res.status(500).json({message: error}) 
    }
}

export const updateCines = async (req,res)=>{
    try {
        const {idcine} = req.params
        const{idciudad, cine} = req.body

        const [result] = await pool.query("UPDATE cine SET idciudad=?, cine=? WHERE idcine=?",[idciudad,cine,idcine])

        if (result.affectedRows === 0) {
            res.status(400).json({message: "No se pudo Actualizar el Cine"})
        }
        
        res.json(idcine)
    } catch (error) {
        res.status(500).json({message: error})
    }
}