const {Router} = require('express');
const { cargarArchivos, actualizarArchivos } = require('../controller/uploads');
const { check } = require('express-validator');
const {validarCampos}= require('../middleware/Validar-Campos');
const { coleccionesPermitidas } = require('../helpers/functionHelper');

const router = Router();

router.post('/',cargarArchivos);

router.put('/:coleccion/:id',[
    check('id','tiene que ser un id de mongo valido').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos,

],actualizarArchivos);


module.exports=router;