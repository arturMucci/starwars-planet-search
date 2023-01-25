import { render, screen, act } from '@testing-library/react';
import mockResponse from './mockResponse';
import React from 'react';
import App from '../App';
// import userEvent from '@testing-library/user-event';

beforeEach(async() => {
  global.fetch = jest.fn(() => (
    Promise.resolve({
      json: () => Promise.resolve(mockResponse),
    })
  ));

  await act(async () => render(
    <App />
  ));
})

describe('Test the initial behavior of the site', () => {
  test('I am your test', () => {
    expect(fetch).toHaveBeenCalled();
    expect(screen.getByPlaceholderText(/Planet Name/i)).toBeInTheDocument();
    expect(screen.getByTestId('column-filter')).toBeInTheDocument();
    expect(screen.getByTestId('comparison-filter')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Valor do filtro/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Apagar todos os filtros/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Filtrar/i })).toBeInTheDocument();
  });
});

