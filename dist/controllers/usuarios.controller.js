"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUsuarios = exports.PutUsuarios = exports.PostUsuarios = exports.getUsuariosByID = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll();
    res.json({
        ok: true,
        msg: 'GetUsuarios',
        usuarios
    });
});
exports.getUsuarios = getUsuarios;
const getUsuariosByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    //Si el Usuario Existe
    if (usuario) {
        res.json({
            ok: true,
            msg: 'GetUsuariosID',
            id,
            usuario
        });
    }
    else {
        res.status(400).json({
            ok: false,
            msg: `El usuario con id ${id} no existe`
        });
    }
});
exports.getUsuariosByID = getUsuariosByID;
const PostUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        //Verificacion Email
        const ExisteEmail = yield usuario_1.default.findOne({
            //Condicion
            where: {
                email: body.email
            }
        });
        //Validamos si el email existe
        if (ExisteEmail) {
            return res.status(400).json({
                ok: false,
                msg: `El email ${body.email} ya está registrado`
            });
        }
        //Para generar el usuario en Typescript con sequelize se debe crear con el comando build
        const usuarioCreado = usuario_1.default.build(body);
        yield usuarioCreado.save();
        res.status(200).json({
            ok: true,
            msg: 'Usuario Creado',
            usuarioCreado
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contacte con el Administrador'
        });
    }
});
exports.PostUsuarios = PostUsuarios;
const PutUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        //Validamos si el usuario existe
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: `El usuario con id ${id} no existe`
            });
        }
        //Verificacion Email
        const ExisteEmail = yield usuario_1.default.findOne({
            //Condicion
            where: {
                email: body.email
            }
        });
        //Validamos si el email existe
        if (ExisteEmail) {
            return res.status(400).json({
                ok: false,
                msg: `El email ${body.email} ya está registrado`
            });
        }
        //Esperamos al await del usuario para proceder a actualizar
        yield usuario.update(body);
        //Respuesta
        res.status(200).json({
            msg: `El usuario ${body.nombre} con id ${id}, fue actualizado con exito`
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contacte con el Administrador'
        });
    }
});
exports.PutUsuarios = PutUsuarios;
const DeleteUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    //Validamos si el usuario existe
    const usuario = yield usuario_1.default.findByPk(id);
    if (!usuario) {
        return res.status(404).json({
            ok: false,
            msg: `El usuario con id ${id} no existe`
        });
    }
    //Cambiar el estado del usuario para "eliminarlo"
    yield usuario.update({ estado: false });
    //Borrarlo para siempre de la BD
    // await usuario.destroy();
    res.status(200).json({
        ok: true,
        msg: `El usuario ${body.nombre} con id ${id} ha sido eliminado correctamente`,
    });
});
exports.DeleteUsuarios = DeleteUsuarios;
//# sourceMappingURL=usuarios.controller.js.map