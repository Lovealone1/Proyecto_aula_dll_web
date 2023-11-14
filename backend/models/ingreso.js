var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IngresoSchema = Schema({
    proveedor: {type: String, required: true},
    ncomprobante: {type: String, required: true},
    documento: {type: String, required: true},
    monto_total: {type: String, required: true},
    serie: {type: Number, required: false},
    monto_resultado: {type: String, required: true},
    usuario: {type: Schema.ObjectId,ref: 'usuario', required: true},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('ingreso',IngresoSchema);