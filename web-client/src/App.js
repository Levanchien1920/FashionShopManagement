import './App.css';
import { BrowserRouter, Route, } from "react-router-dom";
import Header from "./components/Header"
import Footer from "./components/Footer"
import Login from "./components/Login"
import Register from "./components/Register"
import Contact from "./components/Contact"
import LoginContextProvider from './context/LoginContext'
import Cart from './components/Cart/Cart'
import Card from './components/Card'
import Home from './components/Home'
import ProductDetail from "./components/ProductDetail"
import Products from './components/Products';
import MyAccount from './components/MyAccount'
import Order from './components/Orders'
import UpdateAccount from './components/UpdateAccount'
import Checkout from './components/Checkout/Checkout';
function App() {
  return (
    <div >
      <BrowserRouter>
        <LoginContextProvider>
          <Header/>
            <Route path='/' exact component={Home} /> 
            <Route path='/home' exact component={Home} /> 
            <Route path='/register' component={Register} /> 
            <Route path='/cart' component={Cart} /> 
            <Route path='/products' component={Products} />
            <Route path='/login' component={Login} />
            <Route path='/order' component={Order} />
            <Route path='/updateaccount' component={UpdateAccount} />
            <Route path='/myaccount' component={MyAccount} />
            <Route path='/contact' component={Contact} /> 
            <Route path='/checkout' component={Checkout} />  
            <Route path='/productdetail/:id' component={ProductDetail} /> 
           
          <Footer/>
          </LoginContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
