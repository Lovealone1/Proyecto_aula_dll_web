var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = Schema({
    estrellas: {type: Number, required: true},
    comentario: {type: String, required: true},
    producto: {type: Schema.ObjectId,ref: 'producto', required: true},
    cliente: {type: Schema.ObjectId,ref: 'cliente', required: true},
    createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('review',ReviewSchema);