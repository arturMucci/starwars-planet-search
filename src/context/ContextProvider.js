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
  const [numberFilters, setNumberFilters] = useState([]);

  const [columnRender, setColumnRender] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const [columnFilter, setColumnFilter] = useState('population');

  const [comparisonRender, setComparisonRender] = useState([
    'maior que',
    'menor que',
    'igual a',
  ]);

  const [comparisonFilter, setComparisonFilter] = useState('maior que');

  const [valueFilter, setValueFilter] = useState('0');

  const [ordenation, setOrdenation] = useState({
    order: {
      column: '',
      sort: '',
    } });

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
    numberFilters,
    setNumberFilters,
    columnRender,
    setColumnRender,
    columnFilter,
    setColumnFilter,
    comparisonRender,
    setComparisonRender,
    comparisonFilter,
    setComparisonFilter,
    valueFilter,
    setValueFilter,
    ordenation,
    setOrdenation,
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
