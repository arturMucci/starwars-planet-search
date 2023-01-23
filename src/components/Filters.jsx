import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetContext';

function Filters() {
  const { filterText, setTextFilter } = useContext(PlanetsContext);

  return (
    <header>
      <form>
        <label htmlFor="name-filter">
          <input
            data-testid="name-filter"
            id="name-filter"
            placeholder="Planet Name"
            value={ filterText }
            onChange={ ({ target }) => setTextFilter(target.value) }
          />
        </label>
      </form>
    </header>
  );
}

export default Filters;
