import React, { useState, useEffect } from 'react';
import API from '../services/api';

export const DirectorPage = () => {
  const [directores, setDirectores] = useState([]);
  const [nombre, setNombre] = useState('');
  const [estado, setEstado] = useState('Activo');
  const [editingId, setEditingId] = useState(null);

  const fetchDirectores = async () => {
    try {
      const res = await API.get('/directores');
      setDirectores(res.data);
    } catch (err) {
      console.error('Error al cargar directores:', err);
    }
  };

  useEffect(() => { 
    fetchDirectores(); 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('--- Enviando petición al servidor ---');

    try {
      const payload = {
        nombres: nombre, 
        estado: estado 
      };
      const res = editingId
        ? await API.put(`/directores/${editingId}`, payload)
        : await API.post('/directores', payload);
      
      console.log('Respuesta del servidor:', res.data);
      alert(editingId ? '¡Director actualizado con éxito!' : '¡Director guardado con éxito!');
      setNombre('');
      setEstado('Activo');
      setEditingId(null);
      fetchDirectores();
    } catch (err) {
      console.error('Error backend:', err);
      const errorMsg = err.response?.data?.msg || err.response?.data?.message || err.message;
      alert(`Error al guardar: ${errorMsg}`);
    }
  };

  const handleEdit = (director) => {
    setEditingId(director._id);
    setNombre(director.nombres || director.nombre);
    setEstado(director.estado || 'Activo');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNombre('');
    setEstado('Activo');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Deseas eliminar este director?')) return;
    try {
      await API.delete(`/directores/${id}`);
      setDirectores(directores.filter(director => director._id !== id));
    } catch (err) {
      alert(`Error al eliminar: ${err.response?.data?.mensaje || err.message}`);
    }
  };

  return (
    <div className="container text-light">
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom border-secondary pb-2">
        <div>
          <h3 className="fw-bold mb-0">Gestión de Directores</h3>
          <small className="text-white-50">Administración de Directores de Cine/Series</small>
        </div>
      </div>

      <div className="bg-secondary p-4 rounded-3 border border-secondary mb-5 shadow">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label text-white-50">Nombres y Apellidos</label>
              <input 
                type="text" 
                className="form-control"
                value={nombre} 
                onChange={e => setNombre(e.target.value)} 
                placeholder="Ej: Christopher Nolan"
                required 
              />
            </div>
            <div className="col-md-6">
              <label className="form-label text-white-50">Estado</label>
              <select 
                className="form-select"
                value={estado} 
                onChange={e => setEstado(e.target.value)}
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary px-4 mt-4 fw-semibold">
            {editingId ? 'Actualizar Director' : 'Guardar Director'}
          </button>
          {editingId && <button type="button" className="btn btn-outline-light px-4 mt-4 ms-2" onClick={cancelEdit}>Cancelar</button>}
        </form>
      </div>

      <h5 className="text-light mb-3 fw-semibold">Directores Registrados</h5>
      <div className="table-responsive">
        <table className="table table-dark table-striped align-middle border-secondary">
          <thead>
            <tr>
              <th>Nombres</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {directores.map((d, index) => (
              <tr key={d._id || index}>
                <td className="fw-semibold">{d.nombres || d.nombre}</td>
                <td>
                  <span className={`badge ${d.estado === 'Activo' ? 'bg-success' : 'bg-danger'}`}>
                    {d.estado}
                  </span>
                </td>
                <td className="d-flex gap-2">
                  <button type="button" className="btn btn-sm btn-outline-info" onClick={() => handleEdit(d)}>Editar</button>
                  <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(d._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};