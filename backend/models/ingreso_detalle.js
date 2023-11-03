var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Ingreso_detalleSchema = Schema({
    cantidad: {type: Number, required: true},
    precio_unidad: {type: String, required: true},
    ingreso: {type: Schema.ObjectId,ref: 'ingreso', required: true},
    producto: {type: Schema.ObjectId,ref: 'producto', required: true},
    variedad: {type: Schema.ObjectId,ref: 'variacion', required: true},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('ingreso_detalle',Ingreso_detalleSchema);