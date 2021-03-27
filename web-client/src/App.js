import './App.css';
import { BrowserRouter, Route, } from "react-router-dom";
import Header from "./components/Header"
import Footer from "./components/Footer"
import Login from "./components/Login"
import Register from "./components/Register"
import Contact from "./components/Contact"
import LoginContextProvider from './context/LoginContext'
import FeaturedProduct from './components/FeaturedProduct'
import CartAll from "./components/CartAll"
import Cart from './components/Cart/Cart'
import ProductDetail from "./components/ProductDetail"
function App() {
  return (
    <div >
      <BrowserRouter>
        <LoginContextProvider>
          <Header/>
            <Route path='/' exact component={FeaturedProduct} /> 
            <Route path='/register' component={Register} /> 
            <Route path='/login' component={Login} />
            <Route path='/Contact' component={Contact} />  
            <Route path='/Cart' component={Cart} />  
            <Route path='/Cartall' component={CartAll} />  
            <Route path='/productdetail/:id' component={ProductDetail} /> 
          <Footer/>
          </LoginContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
