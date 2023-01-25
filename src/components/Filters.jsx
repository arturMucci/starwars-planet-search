import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetContext';

function Filters() {
  const {
    filterText,
    setTextFilter,
    numberFilters,
    setNumberFilters,
    columnRender,
    setColumnRender,
    columnFilter,
    setColumnFilter,
    comparisonRender,
    comparisonFilter,
    setComparisonFilter,
    valueFilter,
    setValueFilter,
  } = useContext(PlanetsContext);

  const filterFilters = (column) => {
    if (numberFilters.every((each) => each.column !== column)) {
      setNumberFilters([
        ...numberFilters,
        {
          column: columnFilter,
          comparison: comparisonFilter,
          value: valueFilter,
        },
      ]);

      setColumnRender(
        columnRender
          .filter((each) => !numberFilters.map((filter) => filter.column).includes(each)),
      );

      setColumnFilter(columnRender[0]);
    }
  };

  const deleteFilters = (column) => {
    setNumberFilters(numberFilters.filter((filter) => filter.column !== column));
  };

  return (
    <form>
      <section>
        <label htmlFor="name-filter">
          <input
            data-testid="name-filter"
            id="name-filter"
            placeholder="Planet Name"
            value={ filterText }
            onChange={ ({ target }) => setTextFilter(target.value) }
          />
        </label>
      </section>
      <section>
        <select
          data-testid="column-filter"
          name="column-filter"
          id="column-filter"
          value={ columnFilter }
          onChange={ ({ target }) => setColumnFilter(target.value) }
        >
          {
            columnRender.map((each, index) => (
              numberFilters.every((filter) => filter.column !== each) && (
                <option
                  key={ `${each}${index}` }
                >
                  {each}
                </option>
              )
            ))
          }
        </select>
        <select
          data-testid="comparison-filter"
          name="comparison-filter"
          id="comparison-filter"
          onChange={ ({ target }) => setComparisonFilter(target.value) }
        >
          {
            comparisonRender.map((each, index) => (
              <option
                key={ `${each}${index}` }
              >
                {each}
              </option>))
          }
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
          data-testid="button-remove-filters"
          type="button"
          onClick={ () => setNumberFilters([]) }
        >
          Apagar todos os filtros
        </button>
        <button
          data-testid="button-filter"
          type="button"
          onClick={ () => filterFilters(columnFilter) }
        >
          Filtrar
        </button>
      </section>
      <section>
        {
          numberFilters.map((each, index) => (
            <span
              key={ `${each.column}${index}` }
              data-testid="filter"
              className="filters"
            >
              <span>
                {each.column}
              </span>
              {' | '}
              <span>
                {each.comparison}
              </span>
              {' | '}
              <span>
                {each.value}
              </span>
              {' | '}
              <button
                type="button"
                onClick={ () => deleteFilters(each.column) }
              >
                X
              </button>
            </span>
          ))
        }
      </section>
    </form>
  );
}

export default Filters;
