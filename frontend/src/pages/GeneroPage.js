import React, { useState, useEffect } from 'react';
import API from '../services/api';

export const GeneroPage = () => {
  const [generos, setGeneros] = useState([]);
  const [nombre, setNombre] = useState('');
  const [estado, setEstado] = useState('Activo');
  const [descripcion, setDescripcion] = useState('');

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
      await API.post('/generos', { nombre, estado, descripcion }); // Nota el plural '/generos'
      alert('¡Género guardado con éxito!');
      setNombre(''); 
      setDescripcion('');
      fetchGeneros();
    } catch (err) {
      console.error('Error al guardar género:', err);
      alert(`Error al guardar: ${err.response?.data?.msg || err.message}`);
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

      <form onSubmit={handleSubmit} className="bg-dark p-4 rounded-3 border border-secondary mb-5 shadow">
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label text-white-50">Nombre</label>
            <input 
              type="text" 
              className="form-control bg-secondary text-white border-0" 
              value={nombre} 
              onChange={e => setNombre(e.target.value)} 
              required 
            />
          </div>
          <div className="col-md-4">
            <label className="form-label text-white-50">Estado</label>
            <select 
              className="form-select bg-secondary text-white border-0" 
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
              className="form-control bg-secondary text-white border-0" 
              value={descripcion} 
              onChange={e => setDescripcion(e.target.value)} 
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary px-4 mt-4 fw-semibold">
          Guardar Género
        </button>
      </form>

      <h5 className="text-light mb-3 fw-semibold">Géneros Registrados</h5>
      <div className="table-responsive">
        <table className="table table-dark table-striped align-middle border-secondary">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Descripción</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};