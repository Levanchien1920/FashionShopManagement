import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
export default function Order() {
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
                        <div className="tab-pane fade show active" id="orders-tab" role="tabpanel" aria-labelledby="orders-nav">
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>No</th>
                                            <th>Product</th>
                                            <th>Date</th>
                                            <th>Price</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Product Name</td>
                                            <td>01 Jan 2020</td>
                                            <td>$99</td>
                                            <td>Approved</td>
                                            <td><button className="btn">View</button></td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Product Name</td>
                                            <td>01 Jan 2020</td>
                                            <td>$99</td>
                                            <td>Approved</td>
                                            <td><button className="btn">View</button></td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Product Name</td>
                                            <td>01 Jan 2020</td>
                                            <td>$99</td>
                                            <td>Approved</td>
                                            <td><button className="btn">View</button></td>
                                        </tr>
                                    </tbody>
                                </table>
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
