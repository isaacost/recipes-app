import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

describe('Testando componente Header', () => {
  it('Testando se renderiza os icones seachIcon, profileIcon e title', () => {
    render(<Header title="Título" />);
    expect(screen.getByRole('img', { name: /profileicon/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /searchicon/i })).toBeInTheDocument();
    expect(screen.getByTestId('page-title')).toBeInTheDocument();
    expect(screen.getByTestId('page-title').innerHTML).toBe('Título');
  });
});
