var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VentaSchema = Schema({
    serie: {type: Number, required: true},
    total: {type: Number, required: true},
    envio: {type: Number, required: true},

    year: {type: Number, required: true},
    month: {type: Number, required: true},
    day: {type: Number, required: true},

    transaccion: {type: String, required: true},

    cliente: {type: Schema.ObjectId,ref: 'cliente', required: true},
    direccion: {type: Schema.ObjectId,ref: 'direccion', required: true},
    estado: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('venta',VentaSchema);