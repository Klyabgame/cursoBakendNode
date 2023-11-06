const { response } = require("express")
const {ObjectId}= require('mongoose').Types;
const Usuario = require("../models/usuario");
const Categoria = require("../models/categoria");
const Producto = require("../models/producto");

const coleccionesPermitidas=[
    'usuarios',
    'categorias',
    'productos',
    'roles'
]

const buscarUsuarios=async(termino='' ,res=response)=>{

    const esMongoId=ObjectId.isValid(termino);

    if (esMongoId) {
        const usuarios=await Usuario.findById(termino);
        return res.json({
            result:(usuarios)?[usuarios]:[]
        })
    }

    const regex=new RegExp(termino,'i');
    const usuarios=await Usuario.find({
        $or:[{nombre:regex},{correo:regex}],
        $and:[{estado:true}]
    });
    res.json({
        result:usuarios
    })
}
const buscarCategorias=async(termino='' ,res=response)=>{

    const esMongoId=ObjectId.isValid(termino);

    if (esMongoId) {
        const categorias=await Categoria.findById(termino);
        return res.json({
            result:(categorias)?[categorias]:[]
        })
    }

    const regex=new RegExp(termino,'i');
    const categorias=await Categoria.find({nombre:regex,estado:true});
    res.json({
        result:categorias
    })
}

const buscarProductos=async(termino='' ,res=response)=>{

    const esMongoId=ObjectId.isValid(termino);

    if (esMongoId) {
        const productos=await Producto.findById(termino).populate('categoria','nombre').populate('usuario','nombre');
        return res.json({
            result:(productos)?[productos]:[]
        })
    }

    const regex=new RegExp(termino,'i');
    const productos=await Producto.find({nombre:regex,estado:true}).populate('categoria','nombre').populate('usuario','nombre');
    res.json({
        result:productos
    })
}

const buscar=(req,res=response)=>{

    const {coleccion,termino}=req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        res.status(400).json({
            msg:`error - las colecciones permitidas son ${coleccionesPermitidas}`
        })

    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino,res)
        break;
        case 'categorias':
            buscarCategorias(termino,res)
        break;
        case 'productos':
            buscarProductos(termino,res)
        break;

        default:
            res.status(500).json({
                msg:'se olvido hacer esta busqueda'
            })
    }

}


module.exports={
    buscar
}