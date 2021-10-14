import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

//views
import Home from './views/Home/Home';
import Products from './views/Products/Products';
import ProductDetail from './views/ProductDetail/ProductDetail';

//components
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/products" exact component={Products} />
          <Route path="/products/:category" exact component={Products} />
          <Route path="/Product-Detail/:id" exact component={ProductDetail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
