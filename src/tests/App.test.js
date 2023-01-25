import { render, screen, act, within } from '@testing-library/react';
import { useContext } from 'react';
import mockResponse from './mockResponse';
import React from 'react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import PlanetsContext from '../context/PlanetContext';
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

describe('Test the App page: ', () => {
  test('if the form and the table are rendered', () => {
    expect(fetch).toHaveBeenCalled();
    expect(screen.getByPlaceholderText(/Planet Name/i)).toBeInTheDocument();
    expect(screen.getByTestId('column-filter')).toBeInTheDocument();
    expect(screen.getByTestId('comparison-filter')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Valor do filtro/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Apagar todos os filtros/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Filtrar/i })).toBeInTheDocument();
    const table = screen.getAllByRole('rowgroup');
    expect(table[0]).toBeInTheDocument();
    expect(table[1]).toBeInTheDocument();
    const allHeaderRows = within(table[0]).getAllByRole('row');
    expect(allHeaderRows).toHaveLength(1);
    const allTableRows = within(table[1]).getAllByRole('row');
    expect(allTableRows).toHaveLength(10);
  });

  test('if the name filter filter:', () => {
    const nameFilter = screen.getByTestId("name-filter");
    userEvent.type(nameFilter, 'alde');
    expect(screen.getAllByRole('row')).toHaveLength(2);
    userEvent.clear(nameFilter);
    userEvent.type(nameFilter, 'oo');
    expect(screen.getAllByRole('row')).toHaveLength(3);
  });

  test('if the select filters filter', () => {
    expect(screen.queryByTestId('filter')).not.toBeInTheDocument();
    const buttonFilter = screen.getByTestId('button-filter');
    userEvent.click(buttonFilter);
    expect(screen.queryAllByTestId('filter')).toHaveLength(1);
    userEvent.click(buttonFilter);
    expect(screen.queryAllByTestId('filter')).toHaveLength(1);
  });

  it('can delete all filters', () => {
    const columnFilter = screen.getByTestId('column-filter');
    const buttonDelFilter = screen.getByTestId('button-remove-filters');
    const buttonFilter = screen.getByTestId('button-filter');

    userEvent.click(buttonFilter);
    expect(screen.queryAllByTestId('filter')).toHaveLength(1);
    userEvent.selectOptions(columnFilter, ['orbital_period']);
    userEvent.click(buttonFilter);
    expect(screen.queryAllByTestId('filter')).toHaveLength(2);
    userEvent.click(buttonDelFilter);
    expect(screen.queryAllByTestId('filter')).toHaveLength(0);
  });
});

