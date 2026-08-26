const mongoose = require('mongoose');

// Representa una película o serie y conecta sus datos con las entidades del catálogo.
const MediaSchema = new mongoose.Schema({
  serial: { type: String, required: true, unique: true },
  titulo: { type: String, required: true },
  sinopsis: { type: String },
  url: { type: String, required: true, unique: true },
  foto: { type: String },
  anoEstreno: { type: Number },
  genero: { type: mongoose.Schema.Types.ObjectId, ref: 'Genero', required: true },
  director: { type: mongoose.Schema.Types.ObjectId, ref: 'Director', required: true },
  productora: { type: mongoose.Schema.Types.ObjectId, ref: 'Productora', required: true },
  // Estas referencias permiten relacionar la producción con documentos de otras colecciones.
  tipo: { type: mongoose.Schema.Types.ObjectId, ref: 'Tipo', required: true },
}, { timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' } });

module.exports = mongoose.model('Media', MediaSchema);