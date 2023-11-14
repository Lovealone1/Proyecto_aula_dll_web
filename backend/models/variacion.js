var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VariacionSchema = Schema({
    proveedor: {type: String, required: true},
    variacion: {type: String, required: true},
    sku: {type: String, required: true},
    producto: {type: Schema.ObjectId,ref: 'producto', required: true},
    stock: {type: Number,default: 0, required: true},
    createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('variacion',VariacionSchema);