import React, { Component } from 'react';

class Sidebar extends Component{
    render(){
        return (
            <div id="main-wrapper" data-navbarbg="skin6" data-theme="light" data-layout="vertical" data-sidebartype="full" data-boxed-layout="full">
                <div class="left-sidebar" data-sidebarbg="skin5">
                    <div class="scroll-sidebar">

                        <nav class="sidebar-nav">
                            <ul id="sidebarnav">
                                <li class="sidebar-item">
                                    <a class="sidebar-link waves-effect waves-dark sidebar-link" href="index.html" aria-expanded="false">
                                        <i class="mdi mdi-av-timer"></i>
                                        <span class="hide-menu">Dashboard</span>
                                    </a>
                                </li>
                                <li class="sidebar-item">
                                    <a class="sidebar-link waves-effect waves-dark sidebar-link" href="pages-profile.html" aria-expanded="false">
                                        <i class="mdi mdi-account-network"></i>
                                        <span class="hide-menu">Profile</span>
                                    </a>
                                </li>
                                <li class="sidebar-item">
                                    <a class="sidebar-link waves-effect waves-dark sidebar-link" href="form-basic.html" aria-expanded="false">
                                        <i class="mdi mdi-arrange-bring-forward"></i>
                                        <span class="hide-menu">Form Basic</span>
                                    </a>
                                </li>
                                <li class="sidebar-item">
                                    <a class="sidebar-link waves-effect waves-dark sidebar-link" href="table-basic.html" aria-expanded="false">
                                        <i class="mdi mdi-border-none"></i>
                                        <span class="hide-menu">Table</span>
                                    </a>
                                </li>
                                <li class="sidebar-item">
                                    <a class="sidebar-link waves-effect waves-dark sidebar-link" href="icon-material.html" aria-expanded="false">
                                        <i class="mdi mdi-face"></i>
                                        <span class="hide-menu">Icon</span>
                                    </a>
                                </li>
                                <li class="sidebar-item">
                                    <a class="sidebar-link waves-effect waves-dark sidebar-link" href="starter-kit.html" aria-expanded="false">
                                        <i class="mdi mdi-file"></i>
                                        <span class="hide-menu">Blank</span>
                                    </a>
                                </li>
                                <li class="sidebar-item">
                                    <a class="sidebar-link waves-effect waves-dark sidebar-link" href="error-404.html" aria-expanded="false">
                                        <i class="mdi mdi-alert-outline"></i>
                                        <span class="hide-menu">404</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
            
                    </div>
                </div>
            
            </div>
            
        )
    }
}

export default Sidebar