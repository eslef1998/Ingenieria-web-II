const mongoose = require('mongoose');

// Esquema pequeño para clasificar el contenido, por ejemplo como película o serie.
const TipoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
}, { timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' } });

module.exports = mongoose.model('Tipo', TipoSchema);