import { Router } from "express";

import { getClasificaciones, getClasificacion, deleteClasificaciones, createClasificacion, updateClasificacion} from "../controllers/clasificacion.controllers.js";


const router = Router();

router.get("/clasificaciones", getClasificaciones)
router.get("/clasificaciones/:idclasificacion", getClasificacion)
router.delete("/clasificaciones/:idclasificacion", deleteClasificaciones )
router.post("/clasificaciones", createClasificacion)
router.put("/clasificaciones/:idclasificacion", updateClasificacion)

export default router;