import React, { Component } from 'react';
import {Link} from 'react-router-dom'
class Sidebar extends Component{
    render(){
        return (
         
                <div className="left-sidebar" data-sidebarbg="skin5">
                    <div className="scroll-sidebar">

                        <nav className="sidebar-nav">
                            <ul id="sidebarnav">
                                <li className="sidebar-item">
                                    <a className="sidebar-link waves-effect waves-dark sidebar-link" href="index.html" >
                                        <i className="mdi mdi-av-timer"></i>
                                        <span className="hide-menu">Dashboard</span>
                                    </a>
                                </li>
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
                        </nav>
            
                    </div>
                </div>
            
         
            
        )
    }
}

export default Sidebar