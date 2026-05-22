import {pool} from "../db.js"

export const getPagos = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM pago");

        if (result.length === 0) {
            return res.status(404).json({ message: "No hay Pagos para Mostrar" });
        }

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};


export const createPagos = async (req,res)=>{
    try {
        const {idboleto, idtipopago, monto} = req.body
        const [result] = await pool.query("INSERT INTO pago (idboleto, idtipopago, monto) VALUES (?,?,?)",[idboleto, idtipopago, monto])

        if (result.length === 0) {
            res.status(400).json({message: "Error al Crear el Pago"})
        }
        res.json({insertID: result.insertId})
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export const deletePagos = async (req,res)=>{
    try {
        const {idpago} = req.params
        const [result] = await pool.query("DELETE FROM pago WHERE idpago=?",[idpago])
        if (result.affectedRows === 0) {
            res.status(400).json({message: "No se pudo Eliminar el Pago"})
        }
        res.json({message: "El Pago se elimino Correctamente"})
    } catch (error) {
        res.status(500).json({message: error}) 
    }
}

export const updatePagos = async (req,res)=>{
    try {
        const {idpago} = req.params
        const{idboleto, idtipopago, monto} = req.body

        const [result] = await pool.query("UPDATE pago SET idboleto=?, idtipopago=?, monto=? WHERE idpago=?",[idboleto,idtipopago,monto,idpago])

        if (result.affectedRows === 0) {
            res.status(400).json({message: "No se pudo Actualizar el Boleto"})
        }
        
        res.json(idpago)
    } catch (error) {
        res.status(500).json({message: error})
    }
}