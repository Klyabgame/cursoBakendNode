const {Schema,model}= require('mongoose');


const UsuarioSchema= Schema({
    nombre:{
        type:String,
        required:[true,'el nombre es requerido']
    },
    correo:{
        type:String,
        required:[true,'el correo es requerido'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'la constraseña es obligatoria']
    },
    img:{
        type:String
    },
    rol:{
        type:String,
        required:true,
        emum:['ADMIN_ROL','USER_ROL']
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }


})

//ya no funciona
UsuarioSchema.methods.toJSON=function(){
    const {__v,password,_id, ...usuario}= this.toObject();
    usuario.uid=_id;
    return usuario;
}


module.exports=model('Usuario',UsuarioSchema);