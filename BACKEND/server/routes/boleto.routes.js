import { Router } from "express";
import { createBoletos, deleteBoletos, getBoletos, updateBoletos } from "../controllers/boleto.controllers.js";
const router = Router();

router.get("/boleto", getBoletos)
router.post("/boleto", createBoletos)
router.delete("/boleto/:idboleto", deleteBoletos)
router.put("/boleto/:idboleto", updateBoletos)

export default router;