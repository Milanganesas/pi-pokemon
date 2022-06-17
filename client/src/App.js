import { Route, Switch } from 'react-router-dom';
import Landing from './pages/landing';
import Home from './pages/home/index.jsx';
import Detalles from './pages/pokeDetalles';
import Crear from './pages/crear';
import './App.css';

function App() {
  return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Landing}/>
          <Route path='/home' component={Home}/>
          <Route path='/detalle/:id' component={Detalles}/>
          <Route path='/crear' component={Crear}/>
        </Switch>
      </div>    
  );
}

export default App;
