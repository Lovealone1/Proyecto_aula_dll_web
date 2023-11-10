var Carrito = require('../models/carrito');
var Variacion = require('../models/variacion');
var Direccion = require('../models/direccion');

const crear_producto_carrito = async function(req,res){
    if(req.user){
        let data = req.body;

        var variedad = await Variacion.findById({_id:data.variacion}).populate('producto');

        if(data.cantidad <= variedad.stock){
            //
            if(variedad.producto.precio >= 1){
                //
                let carrito = await Carrito.create(data);
                res.status(200).send(carrito);
            }else{
                res.status(200).send({data:undefined,message: 'El producto tiene precio en 0'});
            }
        }else{
            res.status(200).send({data:undefined,message: 'Se supero el stock del producto'});
        }
    }else{
        res.status(500).send({data:undefined,message: 'ErrorToken'});
    }
}

const obtener_carrito_cliente = async function(req,res){
    if(req.user){
       let carrito = await Carrito.find({cliente:req.user.sub}).populate('producto').populate('variacion').sort({createdAt:-1}).limit(5);
       let carrito_general = await Carrito.find({cliente:req.user.sub}).populate('producto').populate('variacion').sort({createdAt:-1});
       res.status(200).send({carrito,carrito_general});
    }else{
        res.status(500).send({data:undefined,message: 'ErrorToken'});
    }
}

const eliminar_producto_carrito = async function(req,res){
    if(req.user){
       let id = req.params['id'];
       let reg = await Carrito.findByIdAndRemove({_id:id});
       res.status(200).send(reg);
    }else{
        res.status(500).send({data:undefined,message: 'ErrorToken'});
    }
}

const crear_direccion_cliente = async function(req,res){
    if(req.user){
       let data = req.body;
       data.cliente = req.user.sub;
       let direccion = await Direccion.create(data);
       res.status(200).send(direccion);
    }else{
        res.status(500).send({data:undefined,message: 'ErrorToken'});
    }
}

const obtener_direcciones_cliente = async function(req,res){
    if(req.user){
       
       let direcciones = await Direccion.find({cliente: req.user.sub});
       res.status(200).send(direcciones);
    }else{
        res.status(500).send({data:undefined,message: 'ErrorToken'});
    }
}

const eliminar_direcciones_cliente = async function(req,res){
    if(req.user){
       let id = req.params['id'];
       let direccion = await Direccion.findByIdAndRemove({_id: id});
       res.status(200).send(direccion);
    }else{
        res.status(500).send({data:undefined,message: 'ErrorToken'});
    }
}

module.exports = {
    crear_producto_carrito,
    obtener_carrito_cliente,
    eliminar_producto_carrito,
    crear_direccion_cliente,
    obtener_direcciones_cliente,
    eliminar_direcciones_cliente
}