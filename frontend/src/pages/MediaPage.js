import React, { useState, useEffect } from 'react';
import API from '../services/api';

export const MediaPage = () => {
  const [medias, setMedias] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);

  const [formData, setFormData] = useState({
    serial: '', titulo: '', sinopsis: '', url: '', foto: '',
    anoEstreno: '', genero: '', director: '', productora: '', tipo: ''
  });
  const [editingId, setEditingId] = useState(null);

  const fetchData = async () => {
    try {
      const [resMedia, resGen, resDir, resProd, resTipo] = await Promise.all([
        API.get('/medias'),
        API.get('/generos'),
        API.get('/directores'),
        API.get('/productoras'),
        API.get('/tipos')
      ]);

      setMedias(resMedia.data);
      setGeneros(resGen.data.filter(g => g.estado === 'Activo'));
      setDirectores(resDir.data.filter(d => d.estado === 'Activo'));
      setProductoras(resProd.data.filter(p => p.estado === 'Activo'));
      setTipos(resTipo.data);
    } catch (err) {
      console.error('Error al cargar el catálogo y sus relaciones:', err);
      alert(`Error al cargar el catálogo: ${err.response?.data?.mensaje || err.message}`);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const image = new Image();
      image.onload = () => {
        const maxDimension = 1200;
        const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
        setFormData({ ...formData, foto: canvas.toDataURL('image/jpeg', 0.8) });
      };
      image.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.foto) {
      alert('Selecciona una imagen para la portada');
      return;
    }

    try {
      if (editingId) {
        await API.put(`/medias/${editingId}`, formData);
      } else {
        await API.post('/medias', formData);
      }
      setFormData({ serial: '', titulo: '', sinopsis: '', url: '', foto: '', anoEstreno: '', genero: '', director: '', productora: '', tipo: '' });
      setEditingId(null);
      fetchData();
      alert(editingId ? 'Registro actualizado correctamente' : 'Registro guardado en la base de datos');
    } catch (err) {
      console.error('Error al registrar la información:', err);
      const message = err.response?.data?.mensaje || err.response?.data?.error || err.message;
      alert(`Error al registrar la información: ${message}`);
    }
  };

  const handleEdit = (media) => {
    setEditingId(media._id);
    setFormData({
      serial: media.serial || '',
      titulo: media.titulo || '',
      sinopsis: media.sinopsis || '',
      url: media.url || '',
      foto: media.foto || '',
      anoEstreno: media.anoEstreno || '',
      genero: media.genero?._id || media.genero || '',
      director: media.director?._id || media.director || '',
      productora: media.productora?._id || media.productora || '',
      tipo: media.tipo?._id || media.tipo || ''
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ serial: '', titulo: '', sinopsis: '', url: '', foto: '', anoEstreno: '', genero: '', director: '', productora: '', tipo: '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Deseas eliminar esta producción?')) return;

    try {
      await API.delete(`/medias/${id}`);
      setMedias(medias.filter(media => media._id !== id));
      alert('Producción eliminada correctamente');
    } catch (err) {
      console.error('Error al eliminar la producción:', err);
      alert(`Error al eliminar: ${err.response?.data?.mensaje || err.message}`);
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
      
      <form onSubmit={handleSubmit} className="bg-secondary p-4 rounded-3 border border-secondary mb-5 shadow">
        <h5 className="text-primary mb-3 fw-semibold">Registrar Nuevo Contenido</h5>
        <div className="row g-3">
          <div className="col-md-3">
            <label className="form-label text-white-50">Código Serial</label>
            <input type="text" name="serial" value={formData.serial} className="form-control" onChange={handleChange} required />
          </div>
          <div className="col-md-5">
            <label className="form-label text-white-50">Título de la Obra</label>
            <input type="text" name="titulo" value={formData.titulo} className="form-control" onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <label className="form-label text-white-50">Año de Estreno</label>
            <input type="number" name="anoEstreno" value={formData.anoEstreno} className="form-control" onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label text-white-50">Imagen de portada</label>
            <input type="file" name="foto" className="form-control" accept="image/*" onChange={handleImageChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label text-white-50">URL Recurso Multimedia</label>
            <input type="text" name="url" value={formData.url} className="form-control" onChange={handleChange} required />
          </div>

          <div className="col-12">
            <label className="form-label text-white-50">Sinopsis / Resumen</label>
            <textarea name="sinopsis" value={formData.sinopsis} className="form-control" rows="2" onChange={handleChange} required></textarea>
          </div>

          <div className="col-md-3">
            <label className="form-label text-white-50">Género</label>
            <select name="genero" value={formData.genero} className="form-select" onChange={handleChange} required>
              <option value="" disabled>Seleccione...</option>
              {generos.map(g => <option key={g._id} value={g._id}>{g.nombre}</option>)}
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label text-white-50">Director</label>
            <select name="director" value={formData.director} className="form-select" onChange={handleChange} required>
              <option value="" disabled>Seleccione...</option>
              {directores.map(d => <option key={d._id} value={d._id}>{d.nombres || d.nombre}</option>)}
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label text-white-50">Productora</label>
            <select name="productora" value={formData.productora} className="form-select" onChange={handleChange} required>
              <option value="" disabled>Seleccione...</option>
              {productoras.map(p => <option key={p._id} value={p._id}>{p.nombre}</option>)}
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label text-white-50">Formato / Tipo</label>
            <select name="tipo" value={formData.tipo} className="form-select" onChange={handleChange} required>
              <option value="" disabled>Seleccione...</option>
              {tipos.map(t => <option key={t._id} value={t._id}>{t.nombre}</option>)}
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary px-4 mt-4 fw-semibold">{editingId ? 'Actualizar Registro' : 'Guardar Registro'}</button>
        {editingId && <button type="button" className="btn btn-outline-light px-4 mt-4 ms-2" onClick={cancelEdit}>Cancelar</button>}
      </form>

      <h5 className="text-light mb-3 fw-semibold">Catálogo Registrado</h5>
      <div className="row g-4">
        {medias.map(m => (
          <div className="col-md-3" key={m._id}>
            <div className="card bg-dark text-white border-secondary h-100 shadow-sm">
              <img src={m.foto} className="card-img-top" alt={m.titulo} style={{ height: '260px', objectFit: 'cover' }} />
              <div className="card-body d-flex flex-column">
                <h6 className="card-title text-primary fw-bold mb-1">{m.titulo}</h6>
                <small className="text-white-50 mb-2">Año: {m.anoEstreno} | Serial: {m.serial}</small>
                <p className="card-text small text-light flex-grow-1">{m.sinopsis}</p>
                <a href={m.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-light w-100 mt-2">Acceder al Recurso</a>
                <button type="button" className="btn btn-sm btn-outline-info w-100 mt-2" onClick={() => handleEdit(m)}>
                  Editar
                </button>
                <button type="button" className="btn btn-sm btn-outline-danger w-100 mt-2" onClick={() => handleDelete(m._id)}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};