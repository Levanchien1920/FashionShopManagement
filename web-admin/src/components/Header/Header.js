import React, {  useContext, useEffect} from 'react';
import { Link} from 'react-router-dom';
import {LoginContext} from '../Context/LoginContext'
import {Dropdown } from 'react-bootstrap'
function Header() {
    const login = useContext(LoginContext);
    var fullname = login.Fullname;
    useEffect(() => {
        login.checklogin();
    }, [fullname])
    const LogoutHandle = () =>{
        login.LogoutDispatch();
    }
        return (
                <div>
                    <div className="topbar" data-navbarbg="skin6">
                        <nav className="navbar top-navbar navbar-expand-md navbar-light">
                            <div className="navbar-header" data-logobg="skin5">
                                <div className="navbar-brand">
                                    <a href="index.html" className="logo">
                               
                                        <b className="logo-icon">
                                            <i className="wi wi-sunset"></i>
                                       
                                            <img src="../../../assets/images/logo-icon.png" alt="homepage" className="dark-logo" />
                                        
                                            <img src="../../../assets/images/logo-light-icon.png" alt="homepage" className="light-logo" />
                                        </b>
                                        <span className="logo-text">
                                        
                                            <img src="../../../assets/images/logo-text.png" alt="homepage" className="dark-logo" />
                                   
                                            <img src="../../../assets/images/logo-light-text.png" className="light-logo" alt="homepage" />
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div className="navbar-collapse collapse" id="navbarSupportedContent" data-navbarbg="skin6">

                                <ul className="navbar-nav float-left mr-auto">

                                    <li className="nav-item search-box">
                                        <a className="nav-link waves-effect waves-dark" href="a">
                                            <div className="d-flex align-items-center">
                                                <i className="mdi mdi-magnify font-20 mr-1"></i>
                                                <div className="ml-1 d-none d-sm-block">
                                                    <span>Search</span>
                                                </div>
                                            </div>
                                        </a>
                                        <div className="form app-search position-absolute">
                                            <input type="text" className="form-control" placeholder="Search &amp; enter"></input>
                                            <a className="srh-btn">
                                                <i className="ti-close"></i>
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                                { login.IsLogin ? (
                                    <ul className="navbar-nav float-right">
                                       <li className="nav-item dropdown">    
                                            <Dropdown >
                                                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor: '#2d3e55'}}>
                                                    welcome : {fullname}
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={LogoutHandle}  >logout</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </li>
                                    </ul> ) : (
                                    <ul className="navbar-nav float-right">
                                        <li className="nav-item dropdown">    
                                            <Link className="nav-link" to="/login">Login</Link>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </nav>
                    </div>
                </div>
        )
}
export default Header