const mongoose = require('mongoose');

// 1. Conectamos al servidor de base de datos.
mongoose.connect('mongodb://127.0.0.1:27017/mauroflex')
    .then(() => console.log("✅ ¡Conexión exitosa con MongoDB!"))
    .catch((err) => console.log("❌ Error al conectar: " + err));

// 2. Definimos cómo es una manguera (Esquema)
const mangueraSchema = new mongoose.Schema({
    nombre: String,
    presion: Number,
    cantidad: Number
});

// 3. Creamos el modelo
const Manguera = mongoose.model('Manguera', mangueraSchema);

console.log("El modelo de Mauroflex está listo.");
