import { Router } from "express";
import { getPeliculas,deletePeliculas,createPeliculas, updatePeliculas } from "../controllers/peliculas.controllers.js";


const router = Router();

router.get('/peliculas',getPeliculas);

router.delete('/peliculas', deletePeliculas);

router.post('/peliculas',createPeliculas)

router.put('/peliculas/:idpelicula', updatePeliculas)

export default router;
