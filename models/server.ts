import express from 'express';
import userRoutes from '../routes/usuario.routes';
import cors from 'cors';
import db from '../db/connection';

class Server {

    private app: express.Application;
    private port: string;
    private paths = {
        usuarios: '/api/usuarios'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        //Conectar Base de datos
        this.conectarBD();
        //Definir middlewares
        this.middlewares();
        //Definir mis rutas
        this.routes();
    }

    //Conectar BD
    async conectarBD(){

        try {
            await db.authenticate();
            console.log('Base de datos Online')
        } catch (error) {
            // throw new Error(error)
            console.log(error)
        }
    }

    //Middlewares
    middlewares(){
        //CORS
        this.app.use(cors());
        //Lectura del body
        this.app.use(express.json());
        //Carpeta Publica
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use( this.paths.usuarios, userRoutes)
    }


    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto '+ this.port);
        })
    }

 
}

export default Server;