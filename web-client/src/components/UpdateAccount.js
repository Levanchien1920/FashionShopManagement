import axios from 'axios';
import React, { useEffect, useState , useContext } from 'react'
import {Link} from 'react-router-dom'
import {LoginContext} from '../context/LoginContext'
export default function UpdateAccount() {
    const login = useContext(LoginContext);
    const [userUpdate , setuserUpdate] = useState({
        username: "",
        password: "",
        fullname: "",
        address: "",
        email: "",
        phone_number: "",
    });
    useEffect(() => {
        let token = {
            headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
        }
        axios.get(`http://localhost:9090/api/v1/client/user/${localStorage.getItem("id")}`,token).then((response)=> {
            let temp = {
                username : response.data.username,
                password : response.data.password,
                fullname: response.data.fullname,
                address :response.data.address ,
                email: response.data.email,
                phone_number: response.data.phone_number  
            }
            setuserUpdate(temp);
        }).catch((error) =>{
        });
    }, [])
    function submitHandle() {
        axios.patch(`http://localhost:9090/api/v1/customer/${localStorage.id}`, userUpdate).then((response)=> {
            alert(response.data.message);
        }).catch((error) =>{
            console.log(error);
        });     
    }
    const LogoutHandle = () =>{
        login.LogoutDispatch();
    }
    return (
        (login.IsLogin !== false) ? (    <div className="my-account">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <div className="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
                        <Link to="/myaccount" className="nav-link" id="address-nav" data-toggle="pill" href="#address-tab" role="tab"><i className="fa fa-user"></i>My account</Link>
                        <Link to="/order" className="nav-link" id="orders-nav" data-toggle="pill" href="#orders-tab" role="tab"><i className="fa fa-shopping-bag"></i>Orders</Link>
                        <Link to="/updateaccount" className="nav-link" id="account-nav" data-toggle="pill" href="#account-tab" role="tab"><i className="fa fa-user"></i>Update Account</Link>
                        <button className="nav-link" onClick={LogoutHandle}><i className="fa fa-sign-out-alt"></i>Logout</button>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="account-tab" role="tabpanel" aria-labelledby="account-nav">
                            <div className="row">
                                <div className="col-md-12">
                                    <label>Full Name</label>
                                    <input className="form-control" type="text" placeholder="fullName"
                                    onChange={e => setuserUpdate({...userUpdate ,fullname : e.target.value})} value={userUpdate.fullname}></input>
                                </div>
                                <div className="col-md-12">
                                    <label>Phone Number</label>
                                    <input className="form-control" type="text" placeholder="Phone Number"
                                    onChange={e => setuserUpdate({...userUpdate ,phone_number : e.target.value})} value={userUpdate.phone_number}></input>
                                </div>
                                <div className="col-md-12">
                                    <label>Email</label>
                                    <input className="form-control" type="text" placeholder="Email"
                                    onChange={e => setuserUpdate({...userUpdate ,email : e.target.value})} value={userUpdate.email}></input>
                                </div>
                                <div className="col-md-12">
                                    <label>Address</label>
                                    <input className="form-control" type="text" placeholder="Address"
                                    onChange={e => setuserUpdate({...userUpdate ,address : e.target.value})} value={userUpdate.address}></input>
                                </div>
                                <div className="col-md-12">
                                    <label>User Name</label>
                                    <input className="form-control" type="text" placeholder="UserName"
                                    onChange={e => setuserUpdate({...userUpdate ,username : e.target.value})} value={userUpdate.username}></input>
                                </div>
                                <div className="col-md-12">
                                    <label>Password</label>
                                    <input className="form-control" type="password" placeholder="Password"
                                    onChange={e => setuserUpdate({...userUpdate ,password : e.target.value})} value={userUpdate.password}></input>
                                </div>
                                <div className="col-md-12">
                                    <button className="btn" onClick={submitHandle}>Save Changes</button>
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
