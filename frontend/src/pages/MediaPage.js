import React, { useState, useEffect } from 'react';
import API from '../services/api';

export const MediaPage = () => {
  const [medias, setMedias] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);

  const [formData, setFormData] = useState({
    serial: '', titulo: '', sinopsis: '', urlPelicula: '', fotoPortada: '',
    anoEstreno: '', generoPrincipal: '', directorPrincipal: '', productora: '', tipo: ''
  });

  const fetchData = async () => {
    try {
      const [resMedia, resGen, resDir, resProd, resTipo] = await Promise.all([
        API.get('/media'),
        API.get('/genero'),
        API.get('/director'),
        API.get('/productora'),
        API.get('/tipo')
      ]);

      setMedias(resMedia.data);
      setGeneros(resGen.data.filter(g => g.estado === 'Activo'));
      setDirectores(resDir.data.filter(d => d.estado === 'Activo'));
      setProductoras(resProd.data.filter(p => p.estado === 'Activo'));
      setTipos(resTipo.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/media', formData);
      fetchData();
      alert('Registro guardado en la base de datos');
    } catch (err) {
      console.error(err);
      alert('Error al registrar la información');
    }
  };

  return (
    <div className="container text-light">
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom border-secondary pb-2">
        <div>
          <h3 className="fw-bold mb-0">Gestión de Producciones Multimediales</h3>
          <small className="text-white-50">Panel Administrativo de Control Interno</small>
        </div>
        <span className="badge bg-primary px-3 py-2">Módulo Activo</span>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-dark p-4 rounded-3 border border-secondary mb-5 shadow">
        <h5 className="text-primary mb-3 fw-semibold">Registrar Nuevo Contenido</h5>
        <div className="row g-3">
          <div className="col-md-3">
            <label className="form-label text-white-50">Código Serial</label>
            <input type="text" name="serial" className="form-control bg-secondary text-white border-0" onChange={handleChange} required />
          </div>
          <div className="col-md-5">
            <label className="form-label text-white-50">Título de la Obra</label>
            <input type="text" name="titulo" className="form-control bg-secondary text-white border-0" onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <label className="form-label text-white-50">Año de Estreno</label>
            <input type="number" name="anoEstreno" className="form-control bg-secondary text-white border-0" onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label text-white-50">URL Portada / Imagen</label>
            <input type="text" name="fotoPortada" className="form-control bg-secondary text-white border-0" onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label text-white-50">URL Recurso Multimedia</label>
            <input type="text" name="urlPelicula" className="form-control bg-secondary text-white border-0" onChange={handleChange} required />
          </div>

          <div className="col-12">
            <label className="form-label text-white-50">Sinopsis / Resumen</label>
            <textarea name="sinopsis" className="form-control bg-secondary text-white border-0" rows="2" onChange={handleChange} required></textarea>
          </div>

          <div className="col-md-3">
            <label className="form-label text-white-50">Género</label>
            <select name="generoPrincipal" className="form-select bg-secondary text-white border-0" onChange={handleChange} required defaultValue="">
              <option value="" disabled>Seleccione...</option>
              {generos.map(g => <option key={g._id} value={g._id}>{g.nombre}</option>)}
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label text-white-50">Director</label>
            <select name="directorPrincipal" className="form-select bg-secondary text-white border-0" onChange={handleChange} required defaultValue="">
              <option value="" disabled>Seleccione...</option>
              {directores.map(d => <option key={d._id} value={d._id}>{d.nombre}</option>)}
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label text-white-50">Productora</label>
            <select name="productora" className="form-select bg-secondary text-white border-0" onChange={handleChange} required defaultValue="">
              <option value="" disabled>Seleccione...</option>
              {productoras.map(p => <option key={p._id} value={p._id}>{p.nombre}</option>)}
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label text-white-50">Formato / Tipo</label>
            <select name="tipo" className="form-select bg-secondary text-white border-0" onChange={handleChange} required defaultValue="">
              <option value="" disabled>Seleccione...</option>
              {tipos.map(t => <option key={t._id} value={t._id}>{t.nombre}</option>)}
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary px-4 mt-4 fw-semibold">Guardar Registro</button>
      </form>

      <h5 className="text-light mb-3 fw-semibold">Catálogo Registrado</h5>
      <div className="row g-4">
        {medias.map(m => (
          <div className="col-md-3" key={m._id}>
            <div className="card bg-dark text-white border-secondary h-100 shadow-sm">
              <img src={m.fotoPortada} className="card-img-top" alt={m.titulo} style={{ height: '260px', objectFit: 'cover' }} />
              <div className="card-body d-flex flex-column">
                <h6 className="card-title text-primary fw-bold mb-1">{m.titulo}</h6>
                <small className="text-white-50 mb-2">Año: {m.anoEstreno} | Serial: {m.serial}</small>
                <p className="card-text small text-light flex-grow-1">{m.sinopsis}</p>
                <a href={m.urlPelicula} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-light w-100 mt-2">Acceder al Recurso</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};