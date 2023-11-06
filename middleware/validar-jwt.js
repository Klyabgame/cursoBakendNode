const { request, response } = require('express');
const jwt=require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT=async(req=request,res=response,next)=>{

    const token=req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg:'no hay token en la peticion'
        })
    }
    try {

        const {uid}=jwt.verify(token,process.env.SECRETORPRIVATEKEY);

        const usuario= await Usuario.findById(uid);
        if (!usuario) {
            return res.status(400).json({
                msg:'usuario no existe en db'
            })
        }

        //verificar que el usuario este en true
        if (!usuario.estado) {
            return res.status(400).json({
                msg:'usuario desabilitado de la bd'
            })
        }

        req.usuario=usuario;

        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'error al acceder al token'
        })
    }
}

module.exports={
    validarJWT
}