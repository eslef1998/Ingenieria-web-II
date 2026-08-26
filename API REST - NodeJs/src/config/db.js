const mongoose = require('mongoose');

// Centraliza la conexión para que el arranque de la API no repita esta configuración.
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado exitosamente');
  } catch (error) {
    // Si la base de datos no responde, la API se detiene porque no puede trabajar correctamente.
    console.error('Error al conectar MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;