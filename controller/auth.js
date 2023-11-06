const {request,response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs=require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');


const authPost=async(req=request,res=response)=>{
    const {correo,password}=req.body;

    try {

        //verificar que el correo exista
        const usuario=await Usuario.findOne({correo});
        if (!usuario) {
            return res.status(400).json({
                msg:'Correo incorrecto'
            })
        }

        //verificar que el estado este en true  
        if (usuario.estado==='false') {
            return res.status(400).json({
                msg:'usuario desactivado'
            })
        }

        //verificar que la contraseña sea valida
        const passwordValid=bcryptjs.compareSync(password,usuario.password);
        if (!passwordValid) {
            return res.status(400).json({
                msg:'contraseña incorrecta'
            })
        }
        //generar el jwt

        const token=await generarJWT(usuario.id);

        res.json({
            msg:'postlogin',
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Se produjo un error, converse con el administrador'
        })
    }

    


}


module.exports={
    authPost
}