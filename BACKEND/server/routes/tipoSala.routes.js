import { Router } from "express";
import { createTipoSalas, deleteTipoSalas, getTipoSalas, updateTipoSalas } from "../controllers/tipoSala.controllers.js";
const router = Router();

router.get("/tipo-sala", getTipoSalas)
router.post("/tipo-sala", createTipoSalas)
router.delete("/tipo-sala/:id_tipo_sala", deleteTipoSalas)
router.put("/tipo-sala/:id_tipo_sala", updateTipoSalas)

export default router;