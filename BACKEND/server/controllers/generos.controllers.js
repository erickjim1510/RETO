import { pool } from "../db.js";

export const getGeneros = async (req,res) => {
    try {
        const [result] = await pool.query("select * from genero");

        if (result.length <= 0) {
            return res.status(400).json({message : "No existen Generos" });
        }
        console.log("Generos: ", result)
        res.json(result)
    } catch (error) {
        return res.status(500).json({message : "Error de Conexion" });
    }
    
}

export const getGenero = async (req,res) =>{
    try {
        const [result] = await pool.query('SELECT * FROM genero WHERE idgenero = ?', [req.params.idgenero]);

        if (result.length === 0) {
            return res.status(404).json({message:"Genero no Encontrado"})
        }
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createGeneros = async (req,res) => {
    try {
        console.log("Create Generos", req);
        const [result] = await pool.query("insert into genero(nombre) values(?) ",[req.body.nombre])
        if (result.length <=0) {
            return res.status(400).json({message: "Error al Insertar registro"})
        }
        console.log("Generos: ",result);
        res.json(result.insertId)
    } catch (error) {
        return res.status(500).json({message : "Error de Servidor " + error.message });
    }
}

export const deleteGeneros = async (req,res) => {
    try {
        console.log("Aqui estamos en Delete ", req.body)
        const [result] = await pool.query("delete from genero where idgenero = ? ",[req.body.idgenero]);

        if (result.affectedRows === 0) {
            return res.status(400).json({message : "No Existe Genero" });
        }
        console.log("Generos: ", result)
        res.json(req.body.idgenero)
    } catch (error) {
        return res.status(500).json({message : "Error del servidor " + error.message });
    }
    
}

export const updateGenero = async (req,res) =>{
    try {
        const result = await pool.query('UPDATE genero set ? WHERE idgenero = ?',[req.body, req.params.idgenero])
        res.json(result);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
