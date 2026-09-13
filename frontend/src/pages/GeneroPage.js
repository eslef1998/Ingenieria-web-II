import React, { useState, useEffect } from 'react';
import API from '../services/api';

export const GeneroPage = () => {
  const [generos, setGeneros] = useState([]);
  const [nombre, setNombre] = useState('');
  const [estado, setEstado] = useState('Activo');
  const [descripcion, setDescripcion] = useState('');

  const fetchGeneros = async () => {
    try {
      const res = await API.get('/genero');
      setGeneros(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchGeneros(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/genero', { nombre, estado, descripcion });
      setNombre(''); setDescripcion('');
      fetchGeneros();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4 text-white">
      <h2>Gestión de Géneros</h2>
      <form onSubmit={handleSubmit} className="bg-secondary p-3 rounded mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <label className="form-label">Estado</label>
            <select className="form-select" value={estado} onChange={e => setEstado(e.target.value)}>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Descripción</label>
            <input type="text" className="form-control" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
          </div>
        </div>
        <button type="submit" className="btn btn-primary px-4 fw-semibold">Guardar Género</button>
      </form>

      <table className="table table-dark table-striped">
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
              <td>{g.nombre}</td>
              <td><span className={`badge ${g.estado === 'Activo' ? 'bg-success' : 'bg-danger'}`}>{g.estado}</span></td>
              <td>{g.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};