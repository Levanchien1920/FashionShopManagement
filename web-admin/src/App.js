import './App.css';
import Login from './components/Login'
import Header from './components/Header'
import Admin from './components/Admin'
import Home from './components/Home'
import {BrowserRouter,Route} from "react-router-dom";
import LoginContextProvider from './context/LoginContext'
function App() {
  return (
    <BrowserRouter>
      <LoginContextProvider>
          <Header/>
          <Route path='/' exact component={Home} /> 
          <Route path='/login'  component={Login} /> 
          <Route path='/admin'  component={Admin} /> 
      </LoginContextProvider>
    </BrowserRouter>
  );
}

export default App;
