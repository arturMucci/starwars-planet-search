import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from '../context/PlanetContext';

function PlanetCard({
  planet,
}) {
  const {
    name,
    rotation_period: rotationPeriod,
    orbital_period: orbitalPeriod,
    diameter,
    climate,
    gravity,
    terrain,
    surface_water: surfaceWater,
    population,
    films,
    created,
    edited,
    url,
  } = planet;

  const { textFilter, numberFilters } = useContext(PlanetsContext);

  const operator = (column, comparison, value) => {
    switch (comparison) {
    case 'maior que':
      return (column > value);
    case 'menor que':
      return (column < value);
    case 'igual a':
      return (column === value);
    default:
      return true;
    }
  };

  const filter1 = name.toLowerCase().includes(textFilter.toLowerCase());

  const filter2 = numberFilters
    .every((each) => (
      operator(Number(planet[each.column]), each.comparison, Number(each.value))));

  if (filter1 && filter2) {
    return (
      <tr>
        <td>{name}</td>
        <td>{rotationPeriod}</td>
        <td>{orbitalPeriod}</td>
        <td>{diameter}</td>
        <td>{climate}</td>
        <td>{gravity}</td>
        <td>{terrain}</td>
        <td>{surfaceWater}</td>
        <td>{population}</td>
        <td>{films}</td>
        <td>{created}</td>
        <td>{edited}</td>
        <td>{url}</td>
      </tr>
    );
  }
}

PlanetCard.propTypes = {
  planet: PropTypes.shape({
    name: PropTypes.string,
    rotationPeriod: PropTypes.string,
    orbitalPeriod: PropTypes.string,
    diameter: PropTypes.string,
    climate: PropTypes.string,
    gravity: PropTypes.string,
    terrain: PropTypes.string,
    surfaceWater: PropTypes.string,
    population: PropTypes.string,
    films: PropTypes.string,
    created: PropTypes.string,
    edited: PropTypes.string,
    url: PropTypes.string,
  }),
}.isRequired;

export default PlanetCard;
