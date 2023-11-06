const mongoose = require('mongoose');

const DatabaseConnect=async()=>{

    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('base de datos conectada con exito');
    } catch (error) {
        console.log(error);
        throw new Error('error de conexion a bd');
    }


}

module.exports=DatabaseConnect;