var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DireccionSchema = Schema({
    nombres: {type: String, required: true},
    apellidos: {type: String, required: true},
    email: {type: String, unique: true},
    documento: {type: String, required: true},
    telefono: {type: String, default:true},
    estado: {type: String, required: true},
    ciudad: {type: String, required: true},
    direccion: {type: String, required: true},
    detalle_direccion: {type: String, required: false},
    zip: {type: String, required: false},
    cliente: {type: Schema.ObjectId, ref: 'cliente', required: true},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('direccion',DireccionSchema);