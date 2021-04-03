import React, { Component } from 'react';

class Header extends Component{
    render(){
        return (
            <div id="main-wrapper" data-navbarbg="skin6" data-theme="light" data-layout="vertical" data-sidebartype="full" data-boxed-layout="full">
                <div class="preloader">
                    <div class="lds-ripple">
                        <div class="lds-pos"></div>
                        <div class="lds-pos"></div>
                    </div>
                </div>

                <div>
                    <div class="topbar" data-navbarbg="skin6">
                        <nav class="navbar top-navbar navbar-expand-md navbar-light">
                            <div class="navbar-header" data-logobg="skin5">
                            
                                <a class="nav-toggler waves-effect waves-light d-block d-md-none" href="javascript:void(0)">
                                    <i class="ti-menu ti-close"></i>
                                </a>
                           
                                <div class="navbar-brand">
                                    <a href="index.html" class="logo">
                               
                                        <b class="logo-icon">
                                            <i class="wi wi-sunset"></i>
                                       
                                            <img src="../../../assets/images/logo-icon.png" alt="homepage" class="dark-logo" />
                                        
                                            <img src="../../../assets/images/logo-light-icon.png" alt="homepage" class="light-logo" />
                                        </b>
                                
                                 
                                        <span class="logo-text">
                                        
                                            <img src="../../../assets/images/logo-text.png" alt="homepage" class="dark-logo" />
                                   
                                            <img src="../../../assets/images/logo-light-text.png" class="light-logo" alt="homepage" />
                                        </span>
                                    </a>
                                </div>

                                <a class="topbartoggler d-block d-md-none waves-effect waves-light" href="javascript:void(0)" data-toggle="collapse" data-target="#navbarSupportedContent"
                                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <i class="ti-more"></i>
                                </a>
                            </div>

                            <div class="navbar-collapse collapse" id="navbarSupportedContent" data-navbarbg="skin6">

                                <ul class="navbar-nav float-left mr-auto">

                                    <li class="nav-item search-box">
                                        <a class="nav-link waves-effect waves-dark" href="javascript:void(0)">
                                            <div class="d-flex align-items-center">
                                                <i class="mdi mdi-magnify font-20 mr-1"></i>
                                                <div class="ml-1 d-none d-sm-block">
                                                    <span>Search</span>
                                                </div>
                                            </div>
                                        </a>
                                        <div class="form app-search position-absolute">
                                            <input type="text" class="form-control" placeholder="Search &amp; enter"></input>
                                            <a class="srh-btn">
                                                <i class="ti-close"></i>
                                            </a>
                                        </div>
                                    </li>
                                </ul>

                                <ul class="navbar-nav float-right">

                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle text-muted waves-effect waves-dark pro-pic" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="../../assets/images/users/1.jpg" alt="user" class="rounded-circle" width="31"></img></a>
                                        <div class="dropdown-menu dropdown-menu-right user-dd animated">
                                            <a class="dropdown-item" href="javascript:void(0)"><i class="ti-user m-r-5 m-l-5"></i> My Profile</a>
                                            <a class="dropdown-item" href="javascript:void(0)"><i class="ti-wallet m-r-5 m-l-5"></i> Logout</a>
                                            <a class="dropdown-item" href="javascript:void(0)"><i class="ti-email m-r-5 m-l-5"></i> Logout</a>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header