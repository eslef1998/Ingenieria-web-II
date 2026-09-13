import React, { useState, useEffect } from 'react';
import API from '../services/api';

export const TipoPage = () => {
  const [tipos, setTipos] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: ''
  });

  const fetchTipos = async () => {
    try {
      const res = await API.get('/tipo');
      setTipos(res.data);
    } catch (err) {
      console.error('Error al obtener los tipos:', err);
    }
  };

  useEffect(() => {
    fetchTipos();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/tipo', formData);
      setFormData({ nombre: '', descripcion: '' });
      fetchTipos();
      alert('Tipo registrado con éxito');
    } catch (err) {
      console.error('Error al guardar el tipo:', err);
      alert('Error al registrar el tipo');
    }
  };

  return (
    <div className="container text-light">
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom border-secondary pb-2">
        <div>
          <h3 className="fw-bold mb-0">Gestión de Tipos</h3>
          <small className="text-white-50">Clasificación de Formatos Multimediales</small>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-dark p-4 rounded-3 border border-secondary mb-5 shadow">
        <div className="row g-3">
          <div className="col-md-5">
            <label className="form-label text-white-50">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              className="form-control bg-secondary text-white border-0"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-7">
            <label className="form-label text-white-50">Descripción</label>
            <input
              type="text"
              name="descripcion"
              value={formData.descripcion}
              className="form-control bg-secondary text-white border-0"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary px-4 mt-4 fw-semibold">
          Guardar Tipo
        </button>
      </form>

      <h5 className="text-light mb-3 fw-semibold">Tipos Registrados</h5>
      <div className="table-responsive">
        <table className="table table-dark table-striped align-middle border-secondary">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {tipos.map((t) => (
              <tr key={t._id}>
                <td className="fw-semibold">{t.nombre}</td>
                <td className="text-white-50">{t.descripcion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};