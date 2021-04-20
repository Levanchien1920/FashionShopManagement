import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoginContextProvider from './components/Context/LoginContext'
import Home from './components/Home/Home';
import Products from './components/Public/Products'
import Brands from './components/Public/Brand'
import Categorys from './components/Public/Category'
import Post from './components/Public/Post'
import Review from './components/Public/Review'
import Customer from './components/Public/Customer'
import Login from './components/Public/Login'
import Employee from './components/Public/Employee'
import NewBrand from './components/New/NewBrand';
import NewCategory from './components/New/NewCategory';
import NewCustomer from './components/New/NewCustomer';
import NewPost from './components/New/NewPost';
import NewProduct from './components/New/NewProduct';
import EditProduct from './components/Edit/EditProduct';
import EditBrand from './components/Edit/EditBrand';

function App() {
  return (
    <Router>
      <div id="main-wrapper" data-navbarbg="skin6" data-theme="light" data-layout="vertical" data-sidebartype="full" data-boxed-layout="full">
          <LoginContextProvider>
            <Home/>
            <Switch>
                <Route exact path='/login' > <Login/>  </Route>
                <Route path='/products' > <Products/>  </Route>
                <Route path='/brands' > <Brands/>  </Route>
                <Route path='/categorys' > <Categorys/>  </Route>
                <Route path='/posts' > <Post/>  </Route>
                <Route path='/reviews' > <Review/>  </Route>
                <Route path='/customer' > <Customer/>  </Route>
                <Route path='/Employee' > <Employee/>  </Route>
                <Route path='/newbrand' > <NewBrand/>  </Route>
                <Route path='/newcategory' > <NewCategory/>  </Route>
                <Route path='/newcustomer' > <NewCustomer/>  </Route>
                <Route path='/newpost' > <NewPost/>  </Route>
                <Route path='/newproduct' > <NewProduct/>  </Route>
                <Route path='/editproduct/:id'> <EditProduct/>  </Route>
                <Route path='/editbrand/:id'> <EditBrand/>  </Route>
                
            </Switch>
          </LoginContextProvider>
      </div>
    </Router>
  );
}
export default App;
