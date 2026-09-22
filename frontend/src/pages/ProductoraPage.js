import React, { useState, useEffect } from 'react';
import API from '../services/api';

export const ProductoraPage = () => {
  const [productoras, setProductoras] = useState([]);
  const [nombre, setNombre] = useState('');
  const [slogan, setSlogan] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('Activo');
  const [editingId, setEditingId] = useState(null);

  const fetchProductoras = async () => {
    try {
      const res = await API.get('/productoras');
      setProductoras(res.data);
    } catch (err) {
      console.error('Error al cargar productoras:', err);
    }
  };

  useEffect(() => { fetchProductoras(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { nombre, slogan, descripcion, estado };
      if (editingId) {
        await API.put(`/productoras/${editingId}`, payload);
      } else {
        await API.post('/productoras', payload);
      }
      setNombre(''); setSlogan(''); setDescripcion('');
      setEstado('Activo');
      setEditingId(null);
      fetchProductoras();
      alert(editingId ? 'Productora actualizada con éxito' : 'Productora registrada con éxito');
    } catch (err) {
      console.error('Error al guardar productora:', err);
      alert(`Error al guardar: ${err.response?.data?.mensaje || err.response?.data?.msg || err.message}`);
    }
  };

  const handleEdit = (productora) => {
    setEditingId(productora._id);
    setNombre(productora.nombre);
    setSlogan(productora.slogan || '');
    setDescripcion(productora.descripcion || '');
    setEstado(productora.estado || 'Activo');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNombre('');
    setSlogan('');
    setDescripcion('');
    setEstado('Activo');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Deseas eliminar esta productora?')) return;
    try {
      await API.delete(`/productoras/${id}`);
      setProductoras(productoras.filter(productora => productora._id !== id));
    } catch (err) {
      alert(`Error al eliminar: ${err.response?.data?.mensaje || err.message}`);
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
        <button type="submit" className="btn btn-primary px-4 fw-semibold">{editingId ? 'Actualizar Productora' : 'Guardar Productora'}</button>
        {editingId && <button type="button" className="btn btn-outline-light px-4 ms-2" onClick={cancelEdit}>Cancelar</button>}
      </form>

      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Slogan</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productoras.map(p => (
            <tr key={p._id}>
              <td>{p.nombre}</td>
              <td>{p.slogan}</td>
              <td><span className={`badge ${p.estado === 'Activo' ? 'bg-success' : 'bg-danger'}`}>{p.estado}</span></td>
              <td className="d-flex gap-2">
                <button type="button" className="btn btn-sm btn-outline-info" onClick={() => handleEdit(p)}>Editar</button>
                <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(p._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};