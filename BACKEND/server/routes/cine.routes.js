import { Router } from "express";
import { createCines, deleteCines, getCines, updateCines } from "../controllers/cine.controllers.js";
const router = Router();

router.get("/cine", getCines)
router.post("/cine", createCines)
router.delete("/cine/:idcine", deleteCines)
router.put("/cine/:idcine", updateCines)

export default router;