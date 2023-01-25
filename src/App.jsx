import './App.css';
import Filters from './components/Filters';
import Table from './components/Table';
import ContextProvider from './context/ContextProvider';

function App() {
  return (
    <>
      <ContextProvider>
        <Filters />
        <Table />
      </ContextProvider>
      ,
    </>
  );
}

export default App;
