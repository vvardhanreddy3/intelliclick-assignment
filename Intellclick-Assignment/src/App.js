import './App.css';
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import Weather from './components/Weather';
import CitiesTable from './components/CitiesTable';

function App() {
  return (
    <Router>
    <div className="App">
     
      <div>
        <Routes>
        <Route path='/' element ={<CitiesTable/>}/>
        <Route path='/weather/:cityName' element={<Weather/>}/>

        </Routes>

      </div>
     
     
     
    </div>
    </Router>
  );
}

export default App;
