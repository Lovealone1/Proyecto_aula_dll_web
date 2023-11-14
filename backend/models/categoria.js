var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategoriariaSchema = Schema({
    titulo: {type: String, required: true},
    slug: {type: String, required: true},
    estado: {type: Boolean, default: true ,required: true},
    createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('categoria',CategoriariaSchema);