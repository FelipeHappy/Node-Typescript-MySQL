import { Request, Response } from "express";
import Usuario from "../models/usuario";


export const getUsuarios = async(req: Request, res: Response) =>{

    const usuarios = await Usuario.findAll()

    res.json({
        ok: true,
        msg: 'GetUsuarios',
        usuarios
    })
}

export const getUsuariosByID = async(req: Request, res: Response) =>{

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);
    //Si el Usuario Existe
    if(usuario){
        res.json({
            ok: true,
            msg: 'GetUsuariosID',
            id,
            usuario
        })
    } else {
        res.status(400).json({
            ok: false,
            msg:`El usuario con id ${id} no existe`
        })
    }
   
}

export const PostUsuarios = async(req: Request, res: Response) =>{

    const { body } = req;
    try {
        
        //Verificacion Email
        const ExisteEmail = await Usuario.findOne({
            //Condicion
            where: {
                email: body.email
            }
        });

        //Validamos si el email existe
        if(ExisteEmail){
            return res.status(400).json({
                ok: false,
                msg: `El email ${body.email} ya está registrado`
            })
        }

        //Para generar el usuario en Typescript con sequelize se debe crear con el comando build
        const usuarioCreado = Usuario.build(body);
        await usuarioCreado.save();
        
        res.status(200).json({
            ok: true,
            msg:'Usuario Creado',
            usuarioCreado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contacte con el Administrador'
        })
    }

  
}

export const PutUsuarios = async(req: Request, res: Response) =>{

    const { id } = req.params;
    const {body} = req;

    try {

        //Validamos si el usuario existe
        const usuario = await Usuario.findByPk(id);
        if(!usuario){
            return res.status(404).json({
                ok:false,
                msg:`El usuario con id ${id} no existe`
            })
        }
         //Verificacion Email
         const ExisteEmail = await Usuario.findOne({
            //Condicion
            where: {
                email: body.email
            }
        });

        //Validamos si el email existe
        if(ExisteEmail){
            return res.status(400).json({
                ok: false,
                msg: `El email ${body.email} ya está registrado`
            })
        }

        //Esperamos al await del usuario para proceder a actualizar
        await usuario.update(body);
        //Respuesta
        res.status(200).json({
            msg:`El usuario ${body.nombre} con id ${id}, fue actualizado con exito`
        })
     

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contacte con el Administrador'
        })
    }
}

export const DeleteUsuarios = async(req: Request, res: Response) =>{

    const {id} = req.params;
    const {body} = req;

     //Validamos si el usuario existe
     const usuario = await Usuario.findByPk(id);
     if(!usuario){
         return res.status(404).json({
             ok:false,
             msg:`El usuario con id ${id} no existe`
         })
     }
    //Cambiar el estado del usuario para "eliminarlo"
    await usuario.update({estado:false})

    //Borrarlo para siempre de la BD
    // await usuario.destroy();
    
    res.status(200).json({
        ok: true,
        msg: `El usuario ${body.nombre} con id ${id} ha sido eliminado correctamente`,
    })
}
