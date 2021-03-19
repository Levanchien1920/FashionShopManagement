import './App.css';
import { BrowserRouter, Route, Link } from "react-router-dom";
import Header from "./components/header"
import Fouter from "./components/footer"
import Login from "./components/login"
import Register from "./components/register"
import Contact from "./components/contact"
import Cart from "./components/cart"
function App() {
  return (
    <div >
      <BrowserRouter>
        <Header/>
        <Route path='/' component={Cart} /> 
        <Route path='/register' component={Register} /> 
        <Route path='/login' component={Login} /> 
        <Fouter/>
      </BrowserRouter>
       
    </div>
  );
}

export default App;
