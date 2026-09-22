import React, { useState, useEffect } from 'react';
import API from '../services/api';

export const GeneroPage = () => {
  const [generos, setGeneros] = useState([]);
  const [nombre, setNombre] = useState('');
  const [estado, setEstado] = useState('Activo');
  const [descripcion, setDescripcion] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchGeneros = async () => {
    try {
      const res = await API.get('/generos'); // Nota el plural '/generos'
      setGeneros(res.data);
    } catch (err) {
      console.error('Error al cargar géneros:', err);
    }
  };

  useEffect(() => { 
    fetchGeneros(); 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { nombre, estado, descripcion };
      if (editingId) {
        await API.put(`/generos/${editingId}`, payload);
      } else {
        await API.post('/generos', payload);
      }
      alert(editingId ? '¡Género actualizado con éxito!' : '¡Género guardado con éxito!');
      setNombre(''); 
      setEstado('Activo');
      setDescripcion('');
      setEditingId(null);
      fetchGeneros();
    } catch (err) {
      console.error('Error al guardar género:', err);
      alert(`Error al guardar: ${err.response?.data?.msg || err.message}`);
    }
  };

  const handleEdit = (genero) => {
    setEditingId(genero._id);
    setNombre(genero.nombre);
    setEstado(genero.estado);
    setDescripcion(genero.descripcion || '');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNombre('');
    setEstado('Activo');
    setDescripcion('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Deseas eliminar este género?')) return;
    try {
      await API.delete(`/generos/${id}`);
      setGeneros(generos.filter(genero => genero._id !== id));
    } catch (err) {
      alert(`Error al eliminar: ${err.response?.data?.mensaje || err.message}`);
    }
  };

  return (
    <div className="container text-light">
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom border-secondary pb-2">
        <div>
          <h3 className="fw-bold mb-0">Gestión de Géneros</h3>
          <small className="text-white-50">Administración de Categorías</small>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-secondary p-4 rounded-3 border border-secondary mb-5 shadow">
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label text-white-50">Nombre</label>
            <input 
              type="text" 
              className="form-control"
              value={nombre} 
              onChange={e => setNombre(e.target.value)} 
              required 
            />
          </div>
          <div className="col-md-4">
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
          <div className="col-md-4">
            <label className="form-label text-white-50">Descripción</label>
            <input 
              type="text" 
              className="form-control"
              value={descripcion} 
              onChange={e => setDescripcion(e.target.value)} 
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary px-4 mt-4 fw-semibold">
          {editingId ? 'Actualizar Género' : 'Guardar Género'}
        </button>
        {editingId && <button type="button" className="btn btn-outline-light px-4 mt-4 ms-2" onClick={cancelEdit}>Cancelar</button>}
      </form>

      <h5 className="text-light mb-3 fw-semibold">Géneros Registrados</h5>
      <div className="table-responsive">
        <table className="table table-dark table-striped align-middle border-secondary">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {generos.map(g => (
              <tr key={g._id}>
                <td className="fw-semibold">{g.nombre}</td>
                <td>
                  <span className={`badge ${g.estado === 'Activo' ? 'bg-success' : 'bg-danger'}`}>
                    {g.estado}
                  </span>
                </td>
                <td className="text-white-50">{g.descripcion}</td>
                <td className="d-flex gap-2">
                  <button type="button" className="btn btn-sm btn-outline-info" onClick={() => handleEdit(g)}>Editar</button>
                  <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(g._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};