const mongoose = require('mongoose');

const TipoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
}, { timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' } });

module.exports = mongoose.model('Tipo', TipoSchema);