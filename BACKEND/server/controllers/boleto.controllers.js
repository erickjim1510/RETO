import {pool} from "../db.js"

export const getBoletos = async (req, res) => {
    try {
        const [result] = await pool.query(`
            SELECT 
                idboleto,
                idusuario,
                DATE_FORMAT(fechacompra, '%Y-%m-%d %H:%i:%s') AS fechacompra
            FROM boleto
        `);

        if (result.length === 0) {
            return res.status(404).json({ message: "No hay Boletos para Mostrar" });
        }

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};


export const createBoletos = async (req,res)=>{
    try {
        const {idusuario, fechacompra} = req.body
        const [result] = await pool.query("INSERT INTO boleto (idusuario, fechacompra) VALUES (?,?)",[idusuario, fechacompra])

        if (result.length === 0) {
            res.status(400).json({message: "Error al Crear el Boleto"})
        }
        res.json({insertID: result.insertId})
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export const deleteBoletos = async (req,res)=>{
    try {
        const {idboleto} = req.params
        const [result] = await pool.query("DELETE FROM boleto WHERE idboleto=?",[idboleto])
        if (result.affectedRows === 0) {
            res.status(400).json({message: "No se pudo Eliminar el Boleto"})
        }
        res.json({message: "El Boleto se elimino Correctamente"})
    } catch (error) {
        res.status(500).json({message: error}) 
    }
}

export const updateBoletos = async (req,res)=>{
    try {
        const {idboleto} = req.params
        const{idusuario, fechacompra} = req.body

        const [result] = await pool.query("UPDATE boleto SET idusuario=?, fechacompra=? WHERE idboleto=?",[idusuario,fechacompra,idboleto])

        if (result.affectedRows === 0) {
            res.status(400).json({message: "No se pudo Actualizar el Boleto"})
        }
        
        res.json(idboleto)
    } catch (error) {
        res.status(500).json({message: error})
    }
}