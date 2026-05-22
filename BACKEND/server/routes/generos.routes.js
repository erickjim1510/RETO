import { Router } from "express";
import { getGeneros,deleteGeneros,createGeneros, getGenero, updateGenero } from "../controllers/generos.controllers.js";


const router = Router();

router.get('/generos',getGeneros);
router.get('/generos/:idgenero', getGenero);
router.delete('/generos', deleteGeneros);
router.put('/generos/:idgenero', updateGenero)
router.post('/generos',createGeneros)

export default router;

