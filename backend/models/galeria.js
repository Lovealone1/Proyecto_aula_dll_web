var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GaleriaSchema = Schema({
    imagen: {type: String, required: true},
    producto: {type: Schema.ObjectId,ref: 'producto', required: true},
    createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('galeria',GaleriaSchema);