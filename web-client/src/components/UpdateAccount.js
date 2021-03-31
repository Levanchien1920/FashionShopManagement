import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
export default function UpdateAccount() {
    const[user , setuser] = useState("");
    useEffect(() => {
           setuser(localStorage.getItem("token"));
    }, [user])
    return (
        (user !== null) ? (    <div className="my-account">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <div className="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
                        <Link to="/myaccount" className="nav-link" id="address-nav" data-toggle="pill" href="#address-tab" role="tab"><i className="fa fa-user"></i>My account</Link>
                        <Link to="/order" className="nav-link" id="orders-nav" data-toggle="pill" href="#orders-tab" role="tab"><i className="fa fa-shopping-bag"></i>Orders</Link>
                        <Link to="/updateaccount" className="nav-link" id="account-nav" data-toggle="pill" href="#account-tab" role="tab"><i className="fa fa-user"></i>Update Account</Link>
                        <button className="nav-link" href="index.html"><i className="fa fa-sign-out-alt"></i>Logout</button>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="account-tab" role="tabpanel" aria-labelledby="account-nav">
                            <h4>Account Details</h4>
                            <div className="row">
                                <div className="col-md-6">
                                    <input className="form-control" type="text" placeholder="First Name"></input>
                                </div>
                                <div className="col-md-6">
                                    <input className="form-control" type="text" placeholder="Last Name"></input>
                                </div>
                                <div className="col-md-6">
                                    <input className="form-control" type="text" placeholder="Mobile"></input>
                                </div>
                                <div className="col-md-6">
                                    <input className="form-control" type="text" placeholder="Email"></input>
                                </div>
                                <div className="col-md-12">
                                    <input className="form-control" type="text" placeholder="Address"></input>
                                </div>
                                <div className="col-md-12">
                                    <button className="btn">Update Account</button>
                                   <br></br><br></br>
                                </div>
                            </div>
                            <h4>Password change</h4>
                            <div className="row">
                                <div className="col-md-12">
                                    <input className="form-control" type="password" placeholder="Current Password"></input>
                                </div>
                                <div className="col-md-6">
                                    <input className="form-control" type="text" placeholder="New Password"></input>
                                </div>
                                <div className="col-md-6">
                                    <input className="form-control" type="text" placeholder="Confirm Password"></input>
                                </div>
                                <div className="col-md-12">
                                    <button className="btn">Save Changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> ) :(
        <div className="dangnhap">bạn cần đăng nhập </div>
    )
    )
}
