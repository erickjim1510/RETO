import { Router } from "express";
import { getSalas, createSalas } from "../controllers/salas.controllers.js";
import { deleteSalas } from "../controllers/salas.controllers.js";
import { updateSalas } from "../controllers/salas.controllers.js";
import { getSala } from "../controllers/salas.controllers.js";
const router = Router();

router.get("/salas", getSalas)
router.get("/salas/:idsala", getSala)
router.post("/salas", createSalas)
router.delete("/salas/:idsala", deleteSalas)
router.put("/salas/:idsala", updateSalas)

export default router