import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoginContextProvider from './components/Context/LoginContext'
import Home from './components/Home/Home';
import Products from './components/Product/Products'
import Brands from './components/Brand/Brand'
import Categorys from './components/Category/Category'
import EditCategory from './components/Category/EditCategory'

// import Post from './components/Public/Post'
// import Review from './components/Public/Reviews'
import Post from './components/Post/Post'
import EditPost from './components/Post/EditPost'
import AddPost from './components/Post/AddPost';
import Review from './components/Reviews/Review'
import Invoice from './components/Invoice/Invoice'
import Customer from './components/Public/Customer'
import Login from './components/Public/Login'
import Employee from './components/Public/Employee'
import Sale from './components/Sale/Sale'
import NewBrand from './components/Brand/NewBrand';
import ProductDetail from './components/Product/ProductDetail';
import AddCategory from './components/Category/AddCategory'
import NewCustomer from './components/New/NewCustomer';
// import NewPost from './components/New/NewPost';
import NewProduct from './components/Product/NewProduct';
import NewImage from './components/Image/NewImage';
import EditProduct from './components/Product/EditProduct';
import EditBrand from './components/Brand/EditBrand';
import NewEmployee from './components/New/NewEmployee';
import EditEmployee from './components/Edit/EditEmployee';
import EditImage from './components/Image/EditImage';
import Image from './components/Image/Image';
import Color from './components/Color/Color'
import NewColor from './components/Color/NewColor'
import EditColor from './components/Color/EditColor'
import Role from './components/Role/Role'
import ListUserOfRole from './components/Role/ListUserOfRole'

function App() {
  return (
    <Router>
      <div id="main-wrapper" data-navbarbg="skin6" data-theme="light" data-layout="vertical" data-sidebartype="full" data-boxed-layout="full">
          <LoginContextProvider>
            <Home/>
            <Switch>
                <Route exact path='/' 
                component={localStorage.getItem("roleNames") === "admin" ? Sale : localStorage.getItem("roleNames") === "employee" ? Products : Login }></Route>
                <Route exact path='/login' > <Login/>  </Route>
                <Route path='/products' > <Products/>  </Route>
                <Route path='/image' component={Image}/>
                <Route path='/color' component={Color}/>
                <Route path='/role' component={Role}/>
                <Route path='/brands' > <Brands/>  </Route>
                <Route path='/categorys' > <Categorys/>  </Route>
                <Route path='/posts' component={Post}/> 
                <Route path='/add-post' component={AddPost}/> 
                <Route path='/edit-post/:id' component = {EditPost} />
                <Route path='/reviews' > <Review/>  </Route>
                <Route path='/product/:id' component={ProductDetail}/>
                <Route path='/invoice' component={Invoice} />
                <Route path='/sale' > <Sale/>  </Route>
                <Route path='/customer' > <Customer/>  </Route>
                <Route path='/Employee' > <Employee/>  </Route>
                <Route path='/newbrand' > <NewBrand/>  </Route>
                <Route path='/addcategory' > <AddCategory/>  </Route>
                <Route path='/newcustomer' > <NewCustomer/>  </Route>
                <Route path='/newimage' component={NewImage} />
                <Route path='/newcolor' component={NewColor}/>
                {/* <Route path='/newpost' > <NewPost/>  </Route> */}
                <Route path='/newemployee' > <NewEmployee/>  </Route>
                <Route path='/newproduct' > <NewProduct/>  </Route>
                <Route path='/editemployee/:id' > <EditEmployee/>  </Route>
                <Route path='/editproduct/:id'> <EditProduct/>  </Route>
                <Route path='/editbrand/:id'> <EditBrand/>  </Route>
                <Route path='/editcategory/:id' component={EditCategory}/>
                <Route path='/editimage/:id' component={EditImage}/>
                <Route path='/editcolor/:id' component={EditColor}/>

                <Route path='/role' component={Role}/>

                <Route path='/userofrole/:id' component={ListUserOfRole}/>
              
            </Switch>
          </LoginContextProvider>
      </div>
    </Router>
  );
}
export default App;
