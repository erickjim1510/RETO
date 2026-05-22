import { Router } from "express";
import { createUsuario, deleteUsuario, getUsuario } from "../controllers/usuarios.controllers.js";


const router = Router();

router.post('/login',getUsuario);
router.post('/registro', createUsuario)
router.post('/usuarios', deleteUsuario)


export default router;


