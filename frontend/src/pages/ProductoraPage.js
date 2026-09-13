import React, { useState, useEffect } from 'react';
import API from '../services/api';

export const ProductoraPage = () => {
  const [productoras, setProductoras] = useState([]);
  const [nombre, setNombre] = useState('');
  const [slogan, setSlogan] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('Activo');

  const fetchProductoras = async () => {
    try {
      const res = await API.get('/productora');
      setProductoras(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchProductoras(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/productora', { nombre, slogan, descripcion, estado });
      setNombre(''); setSlogan(''); setDescripcion('');
      fetchProductoras();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4 text-white">
      <h2>Gestión de Productoras</h2>
      <form onSubmit={handleSubmit} className="bg-secondary p-3 rounded mb-4">
        <div className="row g-3">
          <div className="col-md-3">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} required />
          </div>
          <div className="col-md-3">
            <label className="form-label">Slogan</label>
            <input type="text" className="form-control" value={slogan} onChange={e => setSlogan(e.target.value)} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Descripción</label>
            <input type="text" className="form-control" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Estado</label>
            <select className="form-select" value={estado} onChange={e => setEstado(e.target.value)}>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary px-4 fw-semibold">Guardar Productora</button>
      </form>

      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Slogan</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {productoras.map(p => (
            <tr key={p._id}>
              <td>{p.nombre}</td>
              <td>{p.slogan}</td>
              <td><span className={`badge ${p.estado === 'Activo' ? 'bg-success' : 'bg-danger'}`}>{p.estado}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};