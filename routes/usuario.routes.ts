import { Router } from "express";   
import { DeleteUsuarios, getUsuarios, getUsuariosByID, PostUsuarios, PutUsuarios } from "../controllers/usuarios.controller";

const router = Router();

router.get('/', getUsuarios);
router.get('/:id', getUsuariosByID);
router.post('/', PostUsuarios);
router.put('/:id', PutUsuarios);
router.delete('/:id', DeleteUsuarios);

export default router;