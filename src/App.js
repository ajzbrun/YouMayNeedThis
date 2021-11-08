import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

//views
import Home from './views/Home/Home';
import Products from './views/Products/Products';
import ProductDetail from './views/ProductDetail/ProductDetail';
import Cart from './views/Cart/Cart';

//components
import Navbar from './components/Navbar/Navbar';

//context
import { CartProvider } from './CartContext';

function App() {
  return (
    <CartProvider>
      <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
      <Router>
        <div className="App">
          <Navbar />
          
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/products" exact component={Products} />
            <Route path="/products/:category" exact component={Products} />
            <Route path="/product-detail/:id" exact component={ProductDetail} />
            <Route path="/cart" exact component={Cart} />
          </Switch>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
