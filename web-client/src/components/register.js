import React from 'react'

function register() {
    return (
        <div>
            <div class="breadcrumb-wrap">
                <div class="container-fluid">
                    <ul class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item"><a href="#">Products</a></li>
                        <li class="breadcrumb-item active">Register</li>
                    </ul>
                </div>
            </div>
            <div class="login">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-12">    
                            <div class="register-form">
                                <div class="row">
                                    <div class="col-md-12">
                                        <label>First Name</label>
                                        <input class="form-control" type="text" placeholder="First Name"></input>
                                    </div>
                                    <div class="col-md-6">
                                        <label>Last Name"</label>
                                        <input class="form-control" type="text" placeholder="Last Name"></input>
                                    </div>
                                    <div class="col-md-6">
                                        <label>E-mail</label>
                                        <input class="form-control" type="text" placeholder="E-mail"></input>
                                    </div>
                                    <div class="col-md-6">
                                        <label>Mobile No</label>
                                        <input class="form-control" type="text" placeholder="Mobile No"></input>
                                    </div>
                                    <div class="col-md-6">
                                        <label>Password</label>
                                        <input class="form-control" type="text" placeholder="Password"></input>
                                    </div>
                                    <div class="col-md-6">
                                        <label>Retype Password</label>
                                        <input class="form-control" type="text" placeholder="Password"></input>
                                    </div>
                                    <div class="col-md-12">
                                        <button class="btn">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default register
