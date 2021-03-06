import './App.css';
import Header from "./components/header"
import Fouter from "./components/footer"
import Login from "./components/login"
import Register from "./components/register"
import Contact from "./components/contact"
import Cart from "./components/cart"
function App() {
  return (
    <div >
      <Header/>
      <Cart/>
      <Fouter/>   
    </div>
  );
}

export default App;
