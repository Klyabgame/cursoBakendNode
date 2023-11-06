const Usuario=require('../models/usuario');
const Rol=require('../models/role');
const Categoria = require('../models/categoria');
const producto = require('../models/producto');

const existeCorreo=async(correo)=>{

    const correoExist=await Usuario.findOne({correo});
      if (correoExist) {
        throw new Error(`el correo ${correo} ya existe`);
      }
  }


const existeRol = async(rol='')=>{

    const rolExist=await Rol.findOne({rol});
    if (!rolExist) {
        throw new Error(`El rol ${rol} ingresado no existe en la bd`);
    }
}
const existeIdUsuario = async(id)=>{

    const idExist=await Usuario.findById(id);
    if (!idExist) {
        throw new Error(`El id ${id} no existe en la bd`);
    }
}

const existeIdCategoria = async(id)=>{

  const idExist=await Categoria.findById(id);
  if (!idExist) {
      throw new Error(`El id ${id} categoria no existe en la bd`);
  }
}


const existeIdProducto = async(id)=>{

  const idExist=await producto.findById(id);
  if (!idExist) {
      throw new Error(`El id ${id} producto no existe en la bd`);
  }
}

//colecciones permitidas

const coleccionesPermitidas=(coleccion='', colecciones=[])=>{

  const validar=colecciones.includes(coleccion);

  if (!validar) {
      throw new Error(`la ${coleccion} no esta permitida, las permitidas son : ${colecciones}`)   
  }

  return true;
}



  module.exports={
    existeCorreo,
    existeRol,
    existeIdUsuario,
    existeIdCategoria,
    existeIdProducto,
    coleccionesPermitidas
  }