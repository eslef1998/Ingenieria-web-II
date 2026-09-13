import React, { useState, useEffect } from 'react';
import API from '../services/api';

export const DirectorPage = () => {
  const [directores, setDirectores] = useState([]);
  const [nombre, setNombre] = useState('');
  const [estado, setEstado] = useState('Activo');

  const fetchDirectores = async () => {
    try {
      const res = await API.get('/director');
      setDirectores(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchDirectores(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/director', { nombre, estado });
      setNombre('');
      fetchDirectores();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4 text-white">
      <h2>Gestión de Directores</h2>
      <form onSubmit={handleSubmit} className="bg-secondary p-3 rounded mb-4">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Estado</label>
            <select className="form-select" value={estado} onChange={e => setEstado(e.target.value)}>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary px-4 fw-semibold">Guardar Director</button>
      </form>

      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {directores.map(d => (
            <tr key={d._id}>
              <td>{d.nombre}</td>
              <td><span className={`badge ${d.estado === 'Activo' ? 'bg-success' : 'bg-danger'}`}>{d.estado}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};