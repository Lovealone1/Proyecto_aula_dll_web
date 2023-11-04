var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = Schema({
    nombres: {type: String, required: true},
    apellidos: {type: String, required: false},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    estado: {type: Boolean, default:true},
    
    pais: {type: String, required: false},
    recovery: {type: String, required: false},
    genero: {type: String, required: false},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('cliente',ClienteSchema);