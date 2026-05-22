import { Router } from "express";
import { createPagos, deletePagos, getPagos, updatePagos } from "../controllers/pago.controllers.js";
const router = Router();

router.get("/pago", getPagos)
router.post("/pago", createPagos )
router.delete("/pago/:idpago", deletePagos )
router.put("/pago/:idpago", updatePagos )

export default router;