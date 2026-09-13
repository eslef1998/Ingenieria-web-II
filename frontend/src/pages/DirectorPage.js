import React, { useState, useEffect } from 'react';
import API from '../services/api';

export const DirectorPage = () => {
  const [directores, setDirectores] = useState([]);
  const [nombre, setNombre] = useState('');
  const [estado, setEstado] = useState('Activo');

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
      const res = await API.post('/directores', { 
        nombres: nombre, 
        estado: estado 
      });
      
      console.log('Respuesta del servidor:', res.data);
      alert('¡Director guardado con éxito!');
      setNombre('');
      fetchDirectores();
    } catch (err) {
      console.error('Error backend:', err);
      const errorMsg = err.response?.data?.msg || err.response?.data?.message || err.message;
      alert(`Error al guardar: ${errorMsg}`);
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

      <div className="bg-dark p-4 rounded-3 border border-secondary mb-5 shadow">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label text-white-50">Nombres y Apellidos</label>
              <input 
                type="text" 
                className="form-control bg-secondary text-white border-0" 
                value={nombre} 
                onChange={e => setNombre(e.target.value)} 
                placeholder="Ej: Christopher Nolan"
                required 
              />
            </div>
            <div className="col-md-6">
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
          </div>
          <button type="submit" className="btn btn-primary px-4 mt-4 fw-semibold">
            Guardar Director
          </button>
        </form>
      </div>

      <h5 className="text-light mb-3 fw-semibold">Directores Registrados</h5>
      <div className="table-responsive">
        <table className="table table-dark table-striped align-middle border-secondary">
          <thead>
            <tr>
              <th>Nombres</th>
              <th>Estado</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};