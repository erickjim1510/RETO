import {pool} from "../db.js"

export const getTipoSalas = async (req,res) =>{
    try {
        const [result] = await pool.query("SELECT * FROM tipo_sala")
        if (result.length === 0) {
            return res.status(400).json({message: "No hay Tipos de Salas"})
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export const createTipoSalas = async (req,res) =>{
    try {
        const {nombre} = req.body
        const [result] = await pool.query("INSERT INTO tipo_Sala(nombre) VALUES(?)", [nombre])
        if (result.affectedRows === 0) {
            return res.status(201).json({message: "No se pudo Crear el Tipo de Sala"})
        }
        res.json({ID: result.insertId});
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export const deleteTipoSalas = async (req,res) =>{
    try {
        const {id_tipo_sala} = req.params;
        const [result] = await pool.query("DELETE FROM tipo_sala WHERE id_tipo_sala = ?",[id_tipo_sala])

        if (result.affectedRows === 0) {
            return res.status(400).json({message: "No existen tipos de Salas"})
        }

        res.json({message: "El tipo de sala se Elimino Correctamente"})
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export const updateTipoSalas = async (req,res) =>{
    try {
        const {id_tipo_sala} = req.params;
        const {nombre} = req.body;
        const [result] = await pool.query("UPDATE tipo_sala SET nombre=? WHERE id_tipo_sala=?",[nombre,id_tipo_sala])

        if (result.affectedRows === 0) {
            return res.status(400).json({message: "No hay Salas para Actualizar"})
        }

        res.json(id_tipo_sala)
    } catch (error) {
        res.status(500).json({message: error})
    }
}