var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CarritoSchema = Schema({
    producto: {type: Schema.ObjectId,ref: 'producto',required: true},
    variacion: {type: Schema.ObjectId,ref: 'variacion',required: true},
    cantidad: {type: Number, required: true},
    cliente: {type: Schema.ObjectId,ref: 'cliente',required: true},
    createdAt: {type: Date, default: Date.now}
    
});

module.exports = mongoose.model('carrito',CarritoSchema);