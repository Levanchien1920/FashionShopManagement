import './App.css';
import { BrowserRouter, Route, } from "react-router-dom";
import Header from "./components/Header"
import Fouter from "./components/Footer"
import Login from "./components/Login"
import Register from "./components/Register"
import Contact from "./components/Contact"
import LoginContextProvider from './context/LoginContext'
import Card from './components/Card'
import FeaturedProduct from './components/FeaturedProduct'
import Cart from "./components/Cart"
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
            <Route path='/productdetail/:id' component={ProductDetail} /> 
          <Fouter/>
          </LoginContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
