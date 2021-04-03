import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
function App() {
  return (
    <Router>
        <div>
          <Switch>
              <Route path='/' exact component={Home}></Route>
              <Route path='/home' component={Sidebar}></Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
