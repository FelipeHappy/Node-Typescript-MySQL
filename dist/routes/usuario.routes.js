"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_controller_1 = require("../controllers/usuarios.controller");
const router = (0, express_1.Router)();
router.get('/', usuarios_controller_1.getUsuarios);
router.get('/:id', usuarios_controller_1.getUsuariosByID);
router.post('/', usuarios_controller_1.PostUsuarios);
router.put('/:id', usuarios_controller_1.PutUsuarios);
router.delete('/:id', usuarios_controller_1.DeleteUsuarios);
exports.default = router;
//# sourceMappingURL=usuario.routes.js.map