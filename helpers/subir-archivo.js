const path=require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo=(files,extensionesValidas=['jpg','png','gif'],carpeta='')=>{

    return new Promise((resolve,reject)=>{

        const {archivo} = files;
        const nombreCortado=archivo.name.split('.');
        const extension= nombreCortado[nombreCortado.length-1];

        //validad la extension
        if (!extensionesValidas.includes(extension)) {
            return reject(`La extension ${extension} no es permitida, ${extensionesValidas}`);
        }

        const nombreTemp=uuidv4()+'.'+extension;

        //uploadPath crea la direccion donde esta ubicada la carpeta uploads y le agrega el nombretemp :::
        //__dirname es una variable de nodejs que nos da la ubicacion actual
    
        const uploadPath = path.join(__dirname,'../uploads/',carpeta, nombreTemp);
    

        //codigo para mover el archivo .mv()
        archivo.mv(uploadPath, (err) =>{
        if (err) {
            return reject(err);
        }
    
        resolve(nombreTemp);
        });

    });

    

}


module.exports={
    subirArchivo
}