import './App.css';
import Login from './components/Login'
import Header from './components/Header'
import Home from './components/Home'
import {
  BrowserRouter,
  Route,
  Link,
} from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Route path='/' exact component={Home} /> 
      <Route path='/login' exact component={Login} /> 
    </BrowserRouter>
  );
}

export default App;
