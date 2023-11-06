const {Router} = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middleware/Validar-Campos');
const { validarJWT } = require('../middleware/validar-jwt');
const { esAdminRole } = require('../middleware/validar-roles');
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require('../controller/productos');
const { existeIdCategoria, existeIdProducto } = require('../helpers/functionHelper');

const router = Router();

//para buscar todas las Productos 
router.get('/',obtenerProductos)

//para buscar una Productos por id 
router.get('/:id',[
    check('id').custom(existeIdProducto)
],obtenerProducto)

//para crear las Productos con token valido
router.post('/',[
    validarJWT,
    check('nombre','el nombre es requerido').not().isEmpty(),
    check('categoria','no es un id valido').isMongoId(),
    check('categoria').custom(existeIdCategoria),
    validarCampos
],crearProducto)

//para actualizar las Productos con token valido
router.put('/:id',[
    validarJWT,
    check('id','este id no es un id de mongo').isMongoId(),
    check('id').custom(existeIdProducto),
    validarCampos
],actualizarProducto)

//para borrar las Productos admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','este id no es un id de mongo').isMongoId(),
    check('id').custom(existeIdProducto),
    validarCampos
],borrarProducto)



module.exports=router;