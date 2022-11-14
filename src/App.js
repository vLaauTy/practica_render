import logo from './logo.svg';
import './App.css';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/NavBar';
import Home from './screens/Home';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductScreen from './screens/ProductScreen';
import Badge from 'react-bootstrap/Badge';
import { useContext } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import './index.css'

function App() {

  const { state } = useContext(Store);
  const { cart } = state
  return (

    <div className='App'>
      <NavBar />

      <Routes>
        <Route path='/cart' element={<CartScreen />} />
        <Route path="/product/:_id" element={<ProductScreen />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>


  );
}

export default App;
