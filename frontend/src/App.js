import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { MediaPage } from './pages/MediaPage';
import { GeneroPage } from './pages/GeneroPage';
import { DirectorPage } from './pages/DirectorPage';
import { ProductoraPage } from './pages/ProductoraPage';
import { TipoPage } from './pages/TipoPage';

function App() {
  return (
    <Router>
      <div className="bg-dark min-vh-100 pb-5">
        <Navbar />
        <Routes>
          <Route path="/" element={<MediaPage />} />
          <Route path="/generos" element={<GeneroPage />} />
          <Route path="/directores" element={<DirectorPage />} />
          <Route path="/productoras" element={<ProductoraPage />} />
          <Route path="/tipos" element={<TipoPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;