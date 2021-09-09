"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Importaciones
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./models/server"));
//Configurara entorno
dotenv_1.default.config();
//Instanciamos la clase server
const server = new server_1.default();
//La escuchamos y llamamos a traves del listen hecho anteriormente
server.listen();
//# sourceMappingURL=app.js.map