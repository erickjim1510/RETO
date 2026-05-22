import e from "cors";
import {pool} from "../db.js"

export const getRegistros = async (req,res) =>{

    try {
        const [result] = await pool.query("SELECT id_registro, id_usuario, hora, fecha, tipo from registros");

        if(result.length <= 0){
            return res.status(400).json
            ({message : "No hay Registros"});
        }

        res.json(result)

    } catch (error) {
        return res.status(500).json(
            {message: "Error de Conexion"}
        )
    }

}