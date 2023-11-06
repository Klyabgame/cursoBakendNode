const {request,response}= require('express');
const bcrypt = require('bcryptjs');
const Usuario=require('../models/usuario');


const usuariosGet=async(req= request, res=response) => {

    //const {q, nombre, limit=10, page=1}= req.query;
    const {limit=5,desde=0}= req.query;
    const query={estado:true};

    const [usuarios,total]= await Promise.all([
        Usuario.find(query)
      .skip(Number(desde))
      .limit(Number(limit)),
        Usuario.countDocuments(query)
    ])

    res.json({
      total,
      usuarios
    })
  }

const usuariosPost=async(req=request, res=response) => {

    const {nombre,correo,password,rol}=req.body;
    const usuario=new Usuario({nombre,correo,password,rol});
    //encriptar password
    const salt = bcrypt.genSaltSync();
    usuario.password=bcrypt.hashSync(password, salt);
    //guardar informacion
    await usuario.save();
    res.json(usuario);
  }

const usuariosPut=async(req=request, res=response) => {

    const id=req.params.id;
    const {_id,correo,google,password, ...resto}=req.body;

    if (password) {
      const salt = bcrypt.genSaltSync();
      resto.password=bcrypt.hashSync(password, salt);
    }

    const usuario=await Usuario.findByIdAndUpdate(id,resto);
    res.json({
        usuario
    })
  }

const usuariosDelete=async(req, res) => {
    const id=req.params.id;
    const usuario= await Usuario.findByIdAndUpdate(id,{estado:false})
    const usuarioPermitido=req.usuario;
    res.json({
      usuario,
      usuarioPermitido
    })
  }

module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}