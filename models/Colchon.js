const mongoose = require('mongoose');

const colchonSchema = new mongoose.Schema({
    referencia: { type: String, required: true },
    cantidad: { type: Number, required: true },
    fechaRegistro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Colchon', colchonSchema);
