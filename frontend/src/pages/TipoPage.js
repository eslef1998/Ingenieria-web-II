import React, { useState, useEffect } from 'react';
import API from '../services/api';

export const TipoPage = () => {
  const [tipos, setTipos] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: ''
  });
  const [editingId, setEditingId] = useState(null);

  const fetchTipos = async () => {
    try {
      const res = await API.get('/tipos');
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
      if (editingId) {
        await API.put(`/tipos/${editingId}`, formData);
      } else {
        await API.post('/tipos', formData);
      }
      setFormData({ nombre: '', descripcion: '' });
      setEditingId(null);
      fetchTipos();
      alert(editingId ? 'Tipo actualizado con éxito' : 'Tipo registrado con éxito');
    } catch (err) {
      console.error('Error al guardar el tipo:', err);
      alert(`Error al registrar el tipo: ${err.response?.data?.mensaje || err.message}`);
    }
  };

  const handleEdit = (tipo) => {
    setEditingId(tipo._id);
    setFormData({ nombre: tipo.nombre, descripcion: tipo.descripcion || '' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ nombre: '', descripcion: '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Deseas eliminar este tipo?')) return;
    try {
      await API.delete(`/tipos/${id}`);
      setTipos(tipos.filter(tipo => tipo._id !== id));
    } catch (err) {
      alert(`Error al eliminar: ${err.response?.data?.mensaje || err.message}`);
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

      <form onSubmit={handleSubmit} className="bg-secondary p-4 rounded-3 border border-secondary mb-5 shadow">
        <div className="row g-3">
          <div className="col-md-5">
            <label className="form-label text-white-50">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              className="form-control"
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
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary px-4 mt-4 fw-semibold">
          {editingId ? 'Actualizar Tipo' : 'Guardar Tipo'}
        </button>
        {editingId && <button type="button" className="btn btn-outline-light px-4 mt-4 ms-2" onClick={cancelEdit}>Cancelar</button>}
      </form>

      <h5 className="text-light mb-3 fw-semibold">Tipos Registrados</h5>
      <div className="table-responsive">
        <table className="table table-dark table-striped align-middle border-secondary">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tipos.map((t) => (
              <tr key={t._id}>
                <td className="fw-semibold">{t.nombre}</td>
                <td className="text-white-50">{t.descripcion}</td>
                <td className="d-flex gap-2">
                  <button type="button" className="btn btn-sm btn-outline-info" onClick={() => handleEdit(t)}>Editar</button>
                  <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(t._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};