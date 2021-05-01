import React, {  useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {LoginContext} from '../Context/LoginContext'
function Sidebar() {
    const check = useContext(LoginContext);
    useEffect(() => {
        check.checklogin();
    }, [check.Fullname]);
    return (
        <div className="left-sidebar" data-sidebarbg="skin5">
            <div className="scroll-sidebar">
                <nav className="sidebar-nav">
                    {(check.IsLogin === false ) ? (
                        <ul id="sidebarnav">
                            <li className="sidebar-item">
                                <Link className="sidebar-link waves-effect waves-dark sidebar-link" to="/login" aria-expanded="false">
                                    <i className="mdi-account-network"></i>
                                    <span className="hide-menu">Login</span>
                                </Link>
                            </li> 
                        </ul>
                        ) : ( 
                            (check.Employer === "employee") ? (
                                <ul id="sidebarnav">
                                    <li className="sidebar-item">
                                        <Link className="sidebar-link waves-effect waves-dark sidebar-link" to="/products" aria-expanded="false">
                                            <i className="mdi-account-network"></i>
                                            <span className="hide-menu">Products</span>
                                        </Link>
                                    </li>
                                    <li className="sidebar-item">
                                        <Link className="sidebar-link waves-effect waves-dark sidebar-link" to="/brands" aria-expanded="false">
                                            <i className="mdi-account-network"></i>
                                            <span className="hide-menu">Brand</span>
                                        </Link>
                                    </li>
                                    <li className="sidebar-item">
                                        <Link className="sidebar-link waves-effect waves-dark sidebar-link" to="/categorys" aria-expanded="false">
                                            <i className="mdi-account-network"></i>
                                            <span className="hide-menu">Category</span>
                                        </Link>
                                    </li>
                                    <li className="sidebar-item">
                                        <Link className="sidebar-link waves-effect waves-dark sidebar-link" to="/posts" aria-expanded="false">
                                            <i className="mdi-account-network"></i>
                                            <span className="hide-menu">Post</span>
                                        </Link>
                                    </li>
                                    <li className="sidebar-item">
                                        <Link className="sidebar-link waves-effect waves-dark sidebar-link" to="/reviews" aria-expanded="false">
                                            <i className="mdi-account-network"></i>
                                            <span className="hide-menu">Reviews</span>
                                        </Link>
                                    </li>
                                </ul>
                            ) : (
                                <ul id="sidebarnav">
                                    <li className="sidebar-item">
                                        <Link className="sidebar-link waves-effect waves-dark sidebar-link" to="/customer" aria-expanded="false">
                                            <i className="mdi-account-network"></i>
                                            <span className="hide-menu">Invoice</span>
                                        </Link>
                                    </li>
                                    <li className="sidebar-item">
                                        <Link className="sidebar-link waves-effect waves-dark sidebar-link" to="/employee" aria-expanded="false">
                                            <i className="mdi-account-network"></i>
                                            <span className="hide-menu">Roles</span>
                                        </Link>
                                    </li>
                                    <li className="sidebar-item">
                                        <Link className="sidebar-link waves-effect waves-dark sidebar-link" to="/employee" aria-expanded="false">
                                            <i className="mdi-account-network"></i>
                                            <span className="hide-menu">Employer</span>
                                        </Link>
                                    </li>
                                </ul> 
                            )
                       
                        )}                 
                </nav>
            </div>
        </div> 
    )
}

export default Sidebar