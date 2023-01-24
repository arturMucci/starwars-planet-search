import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetContext';

function Filters() {
  const {
    filterText,
    setTextFilter,
    numberFilters,
    setNumberFilters,
    columnRender,
    columnFilter,
    setColumnFilter,
    comparisonRender,
    comparisonFilter,
    setComparisonFilter,
    valueFilter,
    setValueFilter,
  } = useContext(PlanetsContext);

  return (
    <form>
      <div>
        <label htmlFor="name-filter">
          <input
            data-testid="name-filter"
            id="name-filter"
            placeholder="Planet Name"
            value={ filterText }
            onChange={ ({ target }) => setTextFilter(target.value) }
          />
        </label>
      </div>
      <div>
        <select
          data-testid="column-filter"
          name="column-filter"
          id="column-filter"
          onChange={ ({ target }) => setColumnFilter(target.value) }
        >
          {columnRender.map((each, index) => (
            <option
              key={ `${each}${index}` }
            >
              {each}
            </option>))}
        </select>
        <select
          data-testid="comparison-filter"
          name="comparison-filter"
          id="comparison-filter"
          onChange={ ({ target }) => setComparisonFilter(target.value) }
        >
          {comparisonRender.map((each, index) => (
            <option
              key={ `${each}${index}` }
            >
              {each}
            </option>))}
        </select>
        <label htmlFor="value-filter">
          <input
            placeholder="Valor do filtro"
            data-testid="value-filter"
            type="number"
            value={ valueFilter }
            onChange={ ({ target }) => setValueFilter(target.value) }
            id="value-filter"
          />
        </label>
        <button
          data-testid="button-filter"
          type="button"
          onClick={ () => setNumberFilters([
            ...numberFilters, {
              column: columnFilter,
              comparison: comparisonFilter,
              value: valueFilter,
            }]) }
        >
          Filtrar
        </button>
      </div>
    </form>
  );
}

export default Filters;
