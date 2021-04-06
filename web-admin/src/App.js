import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './components/Home/Home';
import Products from './components/Public/Products'
import Brands from './components/Public/Brand'
import Categorys from './components/Public/Category'
import Post from './components/Public/Post'
import Review from './components/Public/Review'
function App() {
  return (
    <Router>
      <div id="main-wrapper" data-navbarbg="skin6" data-theme="light" data-layout="vertical" data-sidebartype="full" data-boxed-layout="full">
          <Home/>
          <Switch>
              <Route path='/products' > <Products/>  </Route>
              <Route path='/brands' > <Brands/>  </Route>
              <Route path='/categorys' > <Categorys/>  </Route>
              <Route path='/posts' > <Post/>  </Route>
              <Route path='/reviews' > <Review/>  </Route>
          </Switch>
      </div>
    </Router>
  );
}
export default App;
