const mongoose = require('mongoose');

// El esquema guarda el nombre, la descripción y si el género puede seguir usándose.
const GeneroSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  estado: { type: String, enum: ['Activo', 'Inactivo'], default: 'Activo' },
  descripcion: { type: String },
}, { timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' } });

module.exports = mongoose.model('Genero', GeneroSchema);