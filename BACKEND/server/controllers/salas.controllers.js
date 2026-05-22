import { pool } from "../db.js";

export const getSalas = async (req,res) =>{
    try {
        const [result] = await pool.query(`
            SELECT sala.*, tipo_sala.nombre as tipo_nombre
            FROM sala
            INNER JOIN tipo_sala ON sala.id_tipo_sala = tipo_sala.id_tipo_sala
        `);
        
        res.json(result);
    } catch (error) {
        res.status(500).json({Message: error.message});
    }
}

export const getSala = async (req,res) =>{
    try {
        const {idsala} = req.params;
        const [result] = await pool.query("SELECT * FROM sala WHERE idsala=?",[idsala])

        if (result.length === 0) {
            return res.status(404).json({message:"No se Encontraron Salas"})
        }
        res.json(result[0])
    } catch (error) {
        res.status(500).json({Message: error})
    }
}

export const createSalas = async (req,res) =>{
    try {
        const {id_tipo_sala,capacidad} = req.body;
        const [result] = await pool.query("INSERT INTO sala(id_tipo_sala,capacidad) VALUES(?,?)",[id_tipo_sala,capacidad])

        if (result.affectedRows === 0) {
            res.status(400).json({message: "No se pudo Crear la Sala"})
        }

        res.json({insertID: result.insertId})
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export const deleteSalas = async (req,res) =>{
    try {
        const {idsala} = req.params;
        const [result] = await pool.query("DELETE FROM sala WHERE idsala = ?",[idsala])

        if (result.affectedRows === 0) {
            return res.status(400).json({message: "No existen Salas"})
        }

        res.json({message: "La Sala se Elimino Correctamente"})
    } catch (error) {
        res.status(500).json({message: error})
    }

}

export const updateSalas = async (req,res) =>{
    try {
        const {idsala} = req.params;
        const {tipo, capacidad} = req.body;
        const [result] = await pool.query("UPDATE sala SET tipo=?, capacidad=? WHERE idsala=?",[tipo,capacidad,idsala])

        if (result.affectedRows === 0) {
            return res.status(400).json({message: "No hay Salas para Actualizar"})
        }

        res.json(idsala)
    } catch (error) {
        res.status(500).json({message: error})
    }
}