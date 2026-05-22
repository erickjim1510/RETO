import { pool } from "../db.js";

export const getClasificaciones = async(req,res) =>{
    try {
        const  [result] = await pool.query('SELECT * FROM clasificacion ORDER BY idclasificacion');

        if (result.length === 0) {
            res.status(400).json({message: "No Existen Clasificaciones"})
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({message: "Error de Conexion"})
    }
}

export const getClasificacion = async (req,res) =>{
    try {
        const [result] = await pool.query('SELECT * FROM clasificacion WHERE idclasificacion = ?', [req.params.idclasificacion]);

        if (result.length === 0) {
            res.status(400).json({message:"Clasificacion no Encontrada"})
        }
        res.json(result[0])
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const createClasificacion = async(req,res) =>{
    try {
        const {nombre} = req.body;
        const [result] = await pool.query('INSERT INTO clasificacion (nombre) VALUES(?)', [nombre])
    
         res.json({
            idclasificacion: result.insertId,
            nombre
         })
   
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}

export const deleteClasificaciones = async (req,res) =>{
    try {
        const {idclasificacion} = req.params;
        const [result] = await pool.query('DELETE FROM clasificacion WHERE idclasificacion = ?', [idclasificacion])

        if (result.affectedRows === 0) {
          return  res.status(400).json({message: "No existen Clasificaciones"})
        }
        console.log("Clasificacion: ", result)
        res.json(idclasificacion);
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export const updateClasificacion = async(req,res) =>{
    try {
        const {idclasificacion} = req.params;
        const {nombre} = req.body;
        const [result] = await pool.query('UPDATE clasificacion SET nombre = ? WHERE idclasificacion = ?', [nombre,idclasificacion])

        if (result.affectedRows === 0) {
           return  res.status(400).json({message: "No hay Clasificaciones para Actualizar"})
        }
        res.json(idclasificacion)
        } catch (error) {
           return res.status(500).json({message: error})
        }
}



