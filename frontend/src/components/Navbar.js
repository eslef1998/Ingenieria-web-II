import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active fw-bold border-bottom border-2 border-primary' : '';

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black shadow-sm mb-4">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <span className="bg-primary text-white px-2 py-1 rounded-2 fw-bold fs-5">IUD</span>
          <span className="fw-semibold text-light fs-4 fs-sm-5">Media Stream</span>
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-2">
            <li className="nav-item">
              <Link className={`nav-link text-white-50 ${isActive('/')}`} to="/">Catálogo Media</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link text-white-50 ${isActive('/generos')}`} to="/generos">Géneros</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link text-white-50 ${isActive('/directores')}`} to="/directores">Directores</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link text-white-50 ${isActive('/productoras')}`} to="/productoras">Productoras</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link text-white-50 ${isActive('/tipos')}`} to="/tipos">Tipos</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};