var Usuario = require('../models/usuario');
var bcrypt = require('bcrypt-nodejs'); 

const registro_usuario_admin = async function(req,res){
    let data = req.body;

    let usuarios = await Usuario.find({
        email: data.email
    });

    if(usuarios.length >= 1){
        res.status(200).send({data:undefined,message: 'El correo electrónico ya existe'});
    }else{
        bcrypt.hash('123456',null,null ,async function(err,hash){
            if (err){
                res.status(200).send({data:undefined,message: 'No se pudo encriptar la contraseña'});
            }else{
                data.password = hash;
                let usuario = await Usuario.create(data);
                res.status(200).send({data:usuario});
    
            }
        });
    }
}

module.exports = {
    registro_usuario_admin
}