import React, {useContext} from 'react'
// import {useHistory} from 'react-router'
import {Link} from 'react-router-dom'
import {LoginContext} from '../context/LoginContext'
function Header() {
    const login = useContext(LoginContext);
    var fullname = login.Fullname;
    // const history = useHistory();
    // useEffect(() => {
    // //   if (localStorage.getItem("token") === "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMjMiLCJpZCI6MTIzLCJleHAiOjE2MTYzNTgxMDZ9.nrBW8a6fTlrJG18BVM1B6TYhiMSL2ViP-VdNkCYa5s8H8lwcYoRP-paSH-GI1oVPPZD1a2c23DdiMSLshzXj2g"){
    //        login.LoginDispatch();
    //        let x = localStorage.getItem("token");
    //        console.log(x);
    // //   }
    // }, [])
    const LogoutHandle = () =>{
        login.LogoutDispatch();
    }
    return (
        <div>
            <div className="top-bar">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6">
                            <i className="fa fa-envelope"></i>
                            EstoreShop@email.com
                        </div>
                        <div className="col-sm-6">
                            <i className="fa fa-phone-alt"></i>
                            0339905697
                        </div>
                    </div>
                </div>
            </div>  
           
            <div className="nav">
                <div className="container-fluid">
                    <nav className="navbar navbar-expand-md bg-dark navbar-dark">
                        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                            <div className="navbar-nav mr-auto">
                                <Link to='/'className="nav-item nav-link active" >Home</Link>
                                <Link to='/products'className="nav-item nav-link active" >Products</Link>
                                <Link to='/account'className="nav-item nav-link active" >Account</Link>
                                <a href="cart.html" className="nav-item nav-link">Cart</a>
                                <a href="checkout.html" className="nav-item nav-link">Checkout</a>
                                <a href="my-account.html" className="nav-item nav-link">abcm</a>
                            </div>
                            <div className="navbar-nav ml-auto">                               
                                {(fullname !=="") ? ( 
                                        <div className="dropdown">
                                            <button className="dropbtn">Xin chào {fullname}</button>
                                            <div className="dropdown-content">
                                            <button onClick={LogoutHandle}>Logout</button>
                                            <button >My accout</button>
                                        </div>
                                      </div>
                                    ) : (
                                        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                                            <div className="navbar-nav mr-auto">
                                                    <a href="/login" className="dropdown-item color">Login</a>
                                                    <a href="as" className="dropdown-item color">Register</a>
                                            </div>
                                        </div>
                                    )}
                                    
                                
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            <div className="bottom-bar">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-3">
                            <div className="logo">
                                <a href="/">
                                    <img src="img/logo.png" alt="Logo"></img>
                                </a>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="search">
                                <input type="text" placeholder="Search"></input>
                                <button><i className="fa fa-search"></i></button>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="user">
                                <a href="wishlist.html" className="btn wishlist">
                                    <i className="fa fa-heart"></i>
                                    <span>(0)</span>
                                </a>
                                <a href="cart.html" className="btn cart">
                                    <i className="fa fa-shopping-cart"></i>
                                    <span>(0)</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    )
}

export default Header
