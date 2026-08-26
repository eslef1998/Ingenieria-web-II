const mongoose = require('mongoose');

// Define la información descriptiva de una productora y si está activa en el sistema.
const ProductoraSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  estado: { type: String, enum: ['Activo', 'Inactivo'], default: 'Activo' },
  slogan: { type: String },
  descripcion: { type: String },
}, { timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' } });

module.exports = mongoose.model('Productora', ProductoraSchema);