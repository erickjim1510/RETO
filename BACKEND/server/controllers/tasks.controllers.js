import {pool} from '../db.js'

export const getTasks = async (req,res) => {
    const [result] = await pool.query("select * from tasks order by createAt asc");
    console.log("Que pex");
    console.log(result);
    res.json(result);
}

export const getTask = async (req,res) => {
    const [result] = await pool.query("select * from tasks where id = ?",[req.params.id])
    //res.send("Obteniendo una tarea");
    res.json(result);

}

export const createTask = async (req,res) => {
    //console.log(req.body);
    const tit = req.body.title;
    const desc = req.body.descripcion;
    console.log("titulo ",tit);
    console.log("Decri ", desc);
    //inserta en base de datos
    console.log("antes del insert");
    const [result]  = await pool.query('INSERT INTO tasks(title,descripcion) values(?,?)',[tit,desc]);
    console.log(result);   
    console.log(result.insertId);    
    //res.send("Creando una tarea");
    res.json({
        id:result.insertId
    })
}

export const updateTask = (req,res) => {
    res.send("Actualizando una tarea");
}

export const deleteTask = (req,res) => {
    res.send("Eliminando una tarea")
}
