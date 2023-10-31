var Producto = require('../models/producto');
var slugify = require('slugify')

const registro_producto_admin = async function(req,res){
    if(req.user){
        let data = req.body; 
        let productos = await Producto.find({titulo: data.titulo});
        console.log(productos.length);

        if (productos.length>=1) {
            res.status(200).send({data:undefined,message: 'El producto ya existe'});
        }else{
            //Registro exitoso
            var img_path = req.files.portada.path
            var str_img = img_path.split('\\');
            var str_portada = str_img[2];

            data.portada = str_portada; 
            data.slug = slugify(data.titulo);
            
            try {
                let producto = await Producto.create(data);
                res.status(200).send({data:producto});
            } catch (error) {
                res.status(200).send({data:undefined,message: 'No se pudo guardar el producto'});
            }
        }
    }else{
        res.status(500).send({data:undefined,message: 'ErrorToken'});
    }
}

module.exports = {
    registro_producto_admin,
}