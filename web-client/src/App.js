import './App.css';
import { BrowserRouter, Route, } from "react-router-dom";
import Header from "./components/Header"
import Fouter from "./components/Footer"
import Login from "./components/Login"
import Register from "./components/Register"
import Contact from "./components/Contact"
import LoginContextProvider from './context/LoginContext'
import Card from './components/Card'
import Cart from "./components/Cart"
function App() {
  return (
    <div >
      <BrowserRouter>
        <LoginContextProvider>
          <Header/>
            <Route path='/login' component={Cart} /> 
            <Route path='/register' component={Register} /> 
            <Route path='/' component={Login} />
            <Route path='/Contact' component={Contact} />  
          <Fouter/>
          </LoginContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
