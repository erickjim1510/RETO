import { pool } from "../db.js";

export const getPeliculas = async (req,res) => {
    try {
        const [result] = await pool.query("select p.idpelicula,p.titulo,g.nombre as genero, c.nombre as clasificacion, p.idgenero,p.idclasificacion, p.duracion, p.sinopsis, p.imagen_url from pelicula p, genero g, clasificacion c where p.idgenero=g.idgenero and p.idclasificacion=c.idclasificacion ");

        if (result.length <= 0) {
            return res.status(400).json({message : "No existen Peliculas" });
        }
        console.log("Peliculas: ", result)
        res.json(result)
    } catch (error) {
        return res.status(500).json({message : "Error de Conexion" });
    }
    
}

export const createPeliculas = async (req,res) => {
    try {
        const {idclasificacion, idgenero, titulo, duracion, sinopsis, imagen_url} = req.body;

        const [result] = await pool.query("INSERT INTO pelicula(idclasificacion,idgenero,titulo,duracion,sinopsis,imagen_url) VALUES(?,?,?,?,?,?)",[idclasificacion, idgenero, titulo, duracion, sinopsis, imagen_url] )
        if (result.affectedRows <=0) {
            return res.status(400).json({message: "Error al Insertar registro"})
        }
        res.json({insertId: result.insertId})
    } catch (error) {
        return res.status(500).json({message : "Error de Servidor " + error.message });
    }
}

export const deletePeliculas = async (req,res) => {
    try {
        const [result] = await pool.query("delete from pelicula where idpelicula = ? ",[req.body.idpelicula]);

        if (result.affectedRows === 0) {
            return res.status(400).json({message : "No Existe Pelicula" });
        }
        console.log("Peliculas: ", result)
        res.json(req.body.idpelicula)
    } catch (error) {
        return res.status(500).json({message : "Error del servidor " + error.message });
    }
    
}

export const updatePeliculas = async(req,res) =>{
    try {
        const {idpelicula} = req.params;
        const {idclasificacion, idgenero, titulo, duracion, sinopsis, imagen_url} = req.body;
        const [result] = await pool.query("UPDATE pelicula SET idclasificacion = ?, idgenero = ?, titulo = ?, duracion = ?, sinopsis = ?, imagen_url = ? WHERE idpelicula = ?", [idclasificacion, idgenero, titulo, duracion, sinopsis, imagen_url, idpelicula])

        if (result.affectedRows === 0) {
            res.status(400).json({message: "No hay Peliculas para Actualizar" })
        }
        res.json({idpelicula})
    } catch (error) {
        res.status(500).json({message: "Error del Servidor" + error.message})
    }
}
