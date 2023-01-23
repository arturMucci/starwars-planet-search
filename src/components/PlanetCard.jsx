import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from '../context/PlanetContext';

function PlanetCard({
  planet: {
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
  },
}) {
  const { textFilter } = useContext(PlanetsContext);
  if (name.toLowerCase().includes(textFilter.toLowerCase())) {
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
