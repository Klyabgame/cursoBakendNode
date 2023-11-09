const {Router} = require('express');
const { cargarArchivos, mostrarImagen, actualizarArchivosCloudinary } = require('../controller/uploads');
const { check } = require('express-validator');
const { coleccionesPermitidas } = require('../helpers/functionHelper');
const { validarArchivo } = require('../middleware/validar-archivo');

const router = Router();

router.post('/',[validarArchivo],cargarArchivos);

router.put('/:coleccion/:id',[
    validarArchivo,
    check('id','tiene que ser un id de mongo valido').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
    

],actualizarArchivosCloudinary);

router.get('/:coleccion/:id',[
    check('id','tiene que ser un id de mongo valido').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
],mostrarImagen);


module.exports=router;