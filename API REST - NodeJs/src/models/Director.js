const mongoose = require('mongoose');

// Define los campos de un director y controla su estado dentro del catálogo.
const DirectorSchema = new mongoose.Schema({
  nombres: { type: String, required: true },
  estado: { type: String, enum: ['Activo', 'Inactivo'], default: 'Activo' },
}, { timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' } });

module.exports = mongoose.model('Director', DirectorSchema);