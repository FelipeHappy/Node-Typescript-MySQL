//Importaciones
import dotenv from 'dotenv';
import Server from './models/server';

//Configurara entorno
dotenv.config();

//Instanciamos la clase server
const server = new Server();

//La escuchamos y llamamos a traves del listen hecho anteriormente
server.listen()