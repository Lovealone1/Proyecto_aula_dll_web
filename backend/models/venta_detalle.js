var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Venta_detalleSchema = Schema({
    year: {type: Number, required: true},
    month: {type: Number, required: true},
    day: {type: Number, required: true},

    subtotal: {type: Number, required: true},
    precio_unidad: {type: Number, required: true},
    cantidad: {type: Number, required: true},

    cliente: {type: Schema.ObjectId,ref: 'cliente', required: true},
    producto: {type: Schema.ObjectId,ref: 'producto', required: true},
    venta: {type: Schema.ObjectId,ref: 'venta', required: true},
    variacion: {type: Schema.ObjectId,ref: 'variacion', required: true},
    
    createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('venta_Detalle',Venta_detalleSchema);