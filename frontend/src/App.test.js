import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from './components/Navbar';

test('renders the application navigation', () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  expect(screen.getByText('Catálogo Media')).toBeInTheDocument();
  expect(screen.getByText('Géneros')).toBeInTheDocument();
  expect(screen.getByText('Directores')).toBeInTheDocument();
  expect(screen.getByText('Productoras')).toBeInTheDocument();
  expect(screen.getByText('Tipos')).toBeInTheDocument();
});
