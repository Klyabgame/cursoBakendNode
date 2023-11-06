const {Router} = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middleware/Validar-Campos');
const { validarJWT } = require('../middleware/validar-jwt');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controller/categorias');
const { existeIdCategoria } = require('../helpers/functionHelper');
const { esAdminRole } = require('../middleware/validar-roles');

const router = Router();

//para buscar todas las categorias 
router.get('/',obtenerCategorias)

//para buscar una  categoria por id 
router.get('/:id',[
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existeIdCategoria),
    validarCampos
],obtenerCategoria)

//para crear las categorias con token valido
router.post('/',[
    validarJWT,
    check('nombre','debe existir un nombre').not().isEmpty(),
    validarCampos
],crearCategoria)

//para actualizar las categorias con token valido
router.put('/:id',[
    validarJWT,
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existeIdCategoria),
    check('nombre','debe existir un nombre').not().isEmpty(),
    validarCampos
],actualizarCategoria)

//para borrar las categorias admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existeIdCategoria),
    validarCampos
],borrarCategoria)



module.exports=router;