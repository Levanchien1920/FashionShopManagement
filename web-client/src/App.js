import './App.css';
import { BrowserRouter, Route, } from "react-router-dom";
import Header from "./components/Header"
import Footer from "./components/Footer"
import Login from "./components/Login"
import Register from "./components/Register"
import Contact from "./components/Contact"
import LoginContextProvider from './context/LoginContext'

import CartAll from "./components/CartAll"
import Cart from './components/Cart/Cart'
import Card from './components/Card'
import BestSelling from './components/BestSelling'
// import Cart from "./components/Cart"
import ProductDetail from "./components/ProductDetail"
import Products from './components/Products';
import Account from './components/Account'
function App() {
  return (
    <div >
      <BrowserRouter>
        <LoginContextProvider>
          <Header/>
            <Route path='/' exact component={BestSelling} /> 
            <Route path='/register' component={Register} /> 
            <Route path='/cart' component={Cart} /> 
            <Route path='/products' component={Products} />
            <Route path='/login' component={Login} />

            <Route path='/Contact' component={Contact} />  
            {/* <Route path='/Cart' component={Cart} />   */}
            <Route path='/Cartall' component={CartAll} />  
            
            <Route path='/account' component={Account} />
            <Route path='/contact' component={Contact} />  

            <Route path='/productdetail/:id' component={ProductDetail} /> 
          <Footer/>
          </LoginContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
