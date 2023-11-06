const { response } = require("express");
const Producto = require("../models/producto");

//paginado-total-pipulate
const obtenerProductos=async(req,res=response)=>{
    const {limit=5,desde=0}= req.query;
    const query={estado:true};

    const [productos,total]= await Promise.all([
        Producto.find(query)
      .skip(Number(desde))
      .populate('usuario','nombre')
      .limit(Number(limit)),
        Producto.countDocuments(query)
    ])
    res.json({
        total,
        productos
    })
}

//populate
const obtenerProducto=async(req, res=response)=>{

    const {id}=req.params;

    const producto= await Producto.findById(id).populate('usuario','nombre').populate('categoria','nombre');

    res.json(producto)


}


const crearProducto=async(req,res=response)=>{

    const {estado,usuario, ...body}=req.body;
    

    const ProductoDB= await Producto.findOne({nombre:body.nombre});

    if (ProductoDB) {
        return res.status(400).json({
            msg:`El producto ${ProductoDB.nombre}, ya existe`
        });
    }

    //generar la data a guardar

    const data={
        ...body,
        nombre:body.nombre.toUpperCase(),
        usuario:req.usuario._id
    }

    const producto=new Producto(data);

    //guardar db

    await producto.save();

    res.json({
        producto
    })

}

//actualizarCategoria

const actualizarProducto=async(req,res=response)=>{
    const {id}=req.params;
    const {estado,usuario,...data}=req.body;

    data.nombre=data.nombre.toUpperCase();
    data.usuario=req.usuario._id;

    const producto=await Producto.findByIdAndUpdate(id,data,{new:true});

    res.json(producto);
}

//borrarCategoria estado:false

const borrarProducto=async(req,res=response)=>{

    const {id}=req.params;

    const producto=await Producto.findByIdAndUpdate(id,{estado:false})
    
    res.json(producto);
}

module.exports={
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}