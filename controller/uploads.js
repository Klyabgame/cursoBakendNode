
const path=require('path');
const fs=require('fs');
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);
const { response } = require("express");
const { subirArchivo } = require("../helpers/subir-archivo");
const Usuario = require("../models/usuario");
const Producto = require("../models/producto");


const cargarArchivos=async(req,res=response)=>{

  //Object.keys(req.files) ::: se usa para retornar un array de cadenas con los nombres de los objetos. example: bolso:{nombre:cartera,descripcion:grande} ====retorna
  // ['nombre','descripcion'] array de cadenas 
  

  
    try {

      const pathCompleto=await subirArchivo(req.files,undefined,'imgs');

      res.json({
        path:pathCompleto
      })
      
    } catch (msg) {
      res.status(400).json({
        msg
      })
    }

   
}

const actualizarArchivos=async(req,res=response)=>{

  const{id, coleccion}=req.params


  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo= await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg:`no existe usuario con el id ${id}`
        })
      }
      break;

    case 'productos':
        modelo= await Producto.findById(id);
        if (!modelo) {
          return res.status(400).json({
            msg:`no existe producto con el id ${id}`
          })
        }
      break;
  
    default:
      return res.status(500).json({
        msg: 'se me olvido validar esto'
      })
  }

  //limpiar imagenes previas

  if (modelo.img) {
    //borrar la imagen del servidor
    const pathImagen=path.join(__dirname,'../uploads',coleccion,modelo.img);
    if (fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen);
    }

  }

  const pathCompleto=await subirArchivo(req.files,undefined,coleccion);
  modelo.img=pathCompleto;

  await modelo.save();


  res.json({
    mod:modelo
  })


}


const actualizarArchivosCloudinary=async(req,res=response)=>{

  const{id, coleccion}=req.params


  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo= await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg:`no existe usuario con el id ${id}`
        })
      }
      break;

    case 'productos':
        modelo= await Producto.findById(id);
        if (!modelo) {
          return res.status(400).json({
            msg:`no existe producto con el id ${id}`
          })
        }
      break;
  
    default:
      return res.status(500).json({
        msg: 'se me olvido validar esto'
      })
  }

  //limpiar imagenes previas

  if (modelo.img) {
    //borrar la imagen del servidor
    const nombreArr=modelo.img.split('/');
    const nombre=nombreArr[nombreArr.length - 1];
    const [img_id]=nombre.split('.');
    cloudinary.uploader.destroy(img_id);

  }

  
  const {tempFilePath}= req.files.archivo;
  const {secure_url}=await cloudinary.uploader.upload(tempFilePath);

  modelo.img=secure_url;

  await modelo.save();


  res.json({
    mod:modelo
  })




}


const mostrarImagen=async(req,res=response)=>{

  const{id, coleccion}=req.params


  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo= await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg:`no existe usuario con el id ${id}`
        })
      }
      break;

    case 'productos':
        modelo= await Producto.findById(id);
        if (!modelo) {
          return res.status(400).json({
            msg:`no existe producto con el id ${id}`
          })
        }
      break;
  
    default:
      return res.status(500).json({
        msg: 'se me olvido validar esto'
      })
  }

  //limpiar imagenes previas

  if (modelo.img) {
    //borrar la imagen del servidor
    const pathImagen=path.join(__dirname,'../uploads',coleccion,modelo.img);
    if (fs.existsSync(pathImagen)) {
      return res.sendFile(pathImagen)
    }

  }

    const pathImagen=path.join(__dirname,'../assets/no-image.jpg');
    res.sendFile(pathImagen);



}


module.exports={
    cargarArchivos,
    actualizarArchivosCloudinary,
    mostrarImagen
}