var Venta = require('../models/venta');
var Venta_detalle = require('../models/venta_detalle');

const obtener_ventas_admin = async function(req,res){
    if(req.user){
        let inicio = req.params['inicio'];
        let hasta = req.params['hasta'];

        var ventas = await Venta.find({
            createdAt: {
                $gte: new Date(inicio+'T00:00:00'),
                $lt: new Date(hasta+'T00:00:00'),
            }
        }).populate('cliente');
        res.status(200).send(ventas);

    }else{
        res.status(500).send({data:undefined,message: 'ErrorToken'});
    }
}

const obtener_detalles_venta_admin = async function(req,res){
    if(req.user){
        let id = req.params['id'];

        var venta = await Venta.findById({_id: id}).populate('cliente');
        var detalles = await Venta_detalle.find({venta: id}).populate('producto').populate('variacion');
        res.status(200).send({venta,detalles});

    }else{
        res.status(500).send({data:undefined,message: 'ErrorToken'});
    }
}

module.exports = {
    obtener_ventas_admin,
    obtener_detalles_venta_admin
}