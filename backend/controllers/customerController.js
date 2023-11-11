var Carrito = require('../models/carrito');
var Variacion = require('../models/variacion');
var Direccion = require('../models/direccion');
var Venta = require('../models/venta');
var Venta_detalle = require('../models/venta_detalle');

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

const validar_payment_id_venta = async function(req,res){
    if(req.user){
        let payment_id = req.params['payment_id'];
        let venta = await Venta.find({transaccion: payment_id});
        res.status(200).send(venta);
    }else{
         res.status(500).send({data:undefined,message: 'ErrorToken'});
    }
}

const crear_venta_cliente = async function(req,res){
    if(req.user){
        let data = req.body;
        data.year = new Date().getFullYear();
        data.month = new Date().getMonth()+1;
        data.day = new Date().getDate();
        data.estado = 'Pagado';
        let ventas = await Venta.find().sort({createdAt: -1});
        if (ventas.length == 0) {
            data.serie = 1;
        }else{
            data.serie = ventas[0].serie + 1;
        }
        let venta = await Venta.create(data)
        for(var item of data.detalles){
            item.year = new Date().getFullYear();
            item.month = new Date().getMonth()+1;
            item.day = new Date().getDate();
            item.venta = venta._id;
            await Venta_detalle.create(item);
        }

        await Carrito.deleteMany({cliente: data.cliente});

        res.status(200).send(venta);
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
    eliminar_direcciones_cliente,
    validar_payment_id_venta,
    crear_venta_cliente
}