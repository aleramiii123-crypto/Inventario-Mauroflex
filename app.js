const express = require('express');
const mongoose = require('mongoose');
const app = express();

// 1. CONFIGURACIÓN
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// 2. CONEXIÓN (Usando tu usuario 'admi')
const mongoURI = 'mongodb://admi:admin@ac-o9nhvzp-shard-00-00.cy2q5dq.mongodb.net:27017,ac-o9nhvzp-shard-00-01.cy2q5dq.mongodb.net:27017,ac-o9nhvzp-shard-00-02.cy2q5dq.mongodb.net:27017/mauroflex?ssl=true&replicaSet=atlas-e0orez-shard-0&authSource=admin&retryWrites=true&w=majority';

mongoose.connect(mongoURI)
    .then(() => console.log("✅ Conexión exitosa con MongoDB Atlas"))
    .catch((err) => console.log("❌ Error de conexión: " + err));

// 3. MODELO DE DATOS
const productoSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    precio: Number,
    cantidad: Number
});

const Producto = mongoose.model('Producto', productoSchema);

// 4. RUTAS
app.get('/', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.render('index', { productos });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error al cargar el inventario: " + err.message);
    }
});

app.post('/agregar', async (req, res) => {
    try {
        const nuevoProducto = new Producto(req.body);
        await nuevoProducto.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send("Error al guardar el producto");
    }
});

// 5. INICIAR SERVIDOR
app.listen(3000, () => {
    console.log("🚀 Servidor Mauroflex corriendo en http://localhost:3000");
});