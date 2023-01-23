import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetContext';
import PlanetCard from './PlanetCard';

function Table() {
  const { planets, isLoading, titles } = useContext(PlanetsContext);

  return (
    <table>
      <thead>
        <tr>
          {titles.map((title, index) => <th key={ `${title}${index}` }>{title}</th>)}
        </tr>
      </thead>
      <tbody>
        {
          isLoading ? (
            planets
              .map((planet, index) => (
                <PlanetCard
                  key={ `${planet.name}${index}` }
                  planet={ planet }
                />
              ))
          ) : (
            <tr>
              <td>Loading...</td>
            </tr>
          )
        }
      </tbody>
    </table>
  );
}

export default Table;
