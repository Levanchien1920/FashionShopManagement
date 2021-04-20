import React from 'react'

function Register() {
    return (
        <div>
            <div className="breadcrumb-wrap">
                <div className="container-fluid">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item"><a href="#">Products</a></li>
                        <li className="breadcrumb-item active">Register</li>
                    </ul>
                </div>
            </div>
            <div className="login">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">    
                            <div className="register-form">
                                <div className="row">
                                    <div className="col-md-12">
                                        <label>First Name</label>
                                        <input className="form-control" type="text" placeholder="First Name"></input>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Last Name"</label>
                                        <input className="form-control" type="text" placeholder="Last Name"></input>
                                    </div>
                                    <div className="col-md-6">
                                        <label>E-mail</label>
                                        <input className="form-control" type="text" placeholder="E-mail"></input>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Mobile No</label>
                                        <input className="form-control" type="text" placeholder="Mobile No"></input>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Password</label>
                                        <input className="form-control" type="text" placeholder="Password"></input>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Retype Password</label>
                                        <input className="form-control" type="text" placeholder="Password"></input>
                                    </div>
                                    <div className="col-md-12">
                                        <button className="btn">Submit</button>
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

export default Register
