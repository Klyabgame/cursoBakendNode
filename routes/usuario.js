const {Router} = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controller/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/Validar-Campos');
const Rol=require('../models/role');
const { existeCorreo, existeRol, existeIdUsuario } = require('../helpers/functionHelper');
const { validarJWT } = require('../middleware/validar-jwt');
const { esAdminRole, tieneRol } = require('../middleware/validar-roles');
const router = Router();

router.get('/', usuariosGet)
router.post('/',[
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('correo','el correo no es valido').isEmail(),
    check('correo').custom(existeCorreo),
    check('password','el password debe tener mas de 6 letras').isLength({min:7}),
    /* check('rol','el rol no es valido').isIn(['ADMIN_ROL','USER_ROL']) */
    check('rol').custom(existeRol),
    validarCampos
], usuariosPost)
router.put('/:id',[
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existeIdUsuario),
    check('rol').custom(existeRol),
    validarCampos
], usuariosPut)
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    tieneRol('ADMIN_ROLE','USER_ROLE'),
    validarCampos
], usuariosDelete)

module.exports=router;