const {Router} = require('express');
const { check } = require('express-validator');
const { authPost } = require('../controller/auth');
const { validarCampos } = require('../middleware/Validar-Campos');
const router = Router();

//router.get('/', authGet);
router.post('/login',[
    check('correo','no es un correo valido').isEmail(),
    check('password','la constraseña es obligatoria').not().isEmpty(),
    validarCampos
] ,authPost);
//router.put('/', authPut);
//router.delete('/', authDelete);


module.exports=router;