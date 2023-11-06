const express = require('express');
const cors = require('cors');
const DatabaseConnect = require('../database/config');
const fileUpload = require('express-fileupload');


class Server{
    constructor(){
        this.app = express();
        this.port=process.env.PORT;
        this.path={
            usuarios:'/api/usuarios',
            auth:'/api/auth',
            buscar:'/api/buscar',
            categorias:'/api/categorias',
            productos:'/api/productos',
            uploads: '/api/uploads'
        }
        this.connectDB();
        this.middleware();
        this.routes();
        
        
    }

    async connectDB(){
        await DatabaseConnect();
    }

    middleware(){
        this.app.use(cors());
        this.app.use( express.json() );
        this.app.use(express.static('public'));
        //para manejar carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));
    }

    routes(){
        this.app.use(this.path.auth,require('../routes/auth'));
        this.app.use(this.path.buscar,require('../routes/buscar'));
        this.app.use(this.path.categorias,require('../routes/categorias'));
        this.app.use(this.path.productos,require('../routes/productos'));
        this.app.use(this.path.usuarios,require('../routes/usuario'));
        this.app.use(this.path.uploads,require('../routes/uploads'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
          })
    }

}

module.exports=Server;