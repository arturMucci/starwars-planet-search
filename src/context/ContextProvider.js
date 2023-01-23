import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetContext';

function ContextProvider({ children }) {
  const [titles, setTitles] = useState([
    'Name',
    'Rotation Period',
    'Orbital Period',
    'Diameter',
    'Climate',
    'gravity',
    'Terrain',
    'Surface Water',
    'Population',
    'Films',
    'Created',
    'Edited',
    'URL',
  ]);

  const [planets, setPlanets] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [textFilter, setTextFilter] = useState('');

  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((response) => response.json())
      .then((json) => json.results)
      .then((rawData) => rawData.filter((each) => delete each.residents))
      .then((finalData) => setPlanets(finalData))
      .finally(setLoading(true));
  }, []);

  const GLOBAL_CONTEXT = {
    planets,
    setPlanets,
    isLoading,
    setLoading,
    titles,
    setTitles,
    textFilter,
    setTextFilter,
  };

  return (
    <PlanetsContext.Provider value={ GLOBAL_CONTEXT }>
      { children }
    </PlanetsContext.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
