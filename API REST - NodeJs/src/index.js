require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Punto de entrada: prepara Express, conecta MongoDB y registra todos los recursos de la API.
const app = express();

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
// Cada prefijo agrupa los endpoints de una entidad y mantiene separado el código de negocio.
app.use('/api/generos', require('./routes/generoRoutes'));
app.use('/api/directores', require('./routes/directorRoutes'));
app.use('/api/productoras', require('./routes/productoraRoutes'));
app.use('/api/tipos', require('./routes/tipoRoutes'));
app.use('/api/medias', require('./routes/mediaRoutes'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));