import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
function Register() {
    const history=useHistory();
    const [user , setuser] = useState({
        username: "",
        password: "",
        fullname: "",
        address: "",
        email: "",
        phone_number: ""
    });
    const [message , setmessage] = useState("")
    const [RetypePassword, setRetypePassword] = useState("");
    const register =  (e) =>{
        if( user.fullname === "" || user.phone_number === "" || user.password === "" || user.address === "" || user.email === "" || user.username === "" || RetypePassword ==="" ) {
            setmessage("You have not entered enough");
        }else {
            if(RetypePassword !== user.password){
                setmessage(" Retype Password Don't Correct ");
            }
            else {
                axios.post("http://localhost:9090/api/v1/customer", user).then((response)=> {
                    alert(response.message);
                    history.push("/login");
                }).catch((error) =>{
                    alert(error.message);
                });
            }
        }
    }
    return (
        <div>
            <div className="breadcrumb-wrap">
                <div className="container-fluid">
                    <ul className="breadcrumb">
                        <Link to="/"  class="breadcrumb-item">Home</Link>
                        <Link to="/products"  class="breadcrumb-item">Products</Link>
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
                                    <div className="col-md-6">
                                        <label>Full Name</label>
                                        <input className="form-control" type="text" placeholder="Full Name"
                                         onChange={e => setuser({...user ,fullname : e.target.value})} value={user.fullName}></input>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Email "</label>
                                        <input className="form-control" type="text" placeholder="Email"
                                         onChange={e => setuser({...user ,email : e.target.value})} value={user.email}></input>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Address </label>
                                        <input className="form-control" type="text" placeholder="Address"
                                         onChange={e => setuser({...user ,address : e.target.value})} value={user.address}></input>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Phone Number</label>
                                        <input className="form-control" type="text" placeholder="Phone Number"
                                         onChange={e => setuser({...user ,phone_number : e.target.value})} value={user.phone_Number}></input>
                                    </div>
                                    <div className="col-md-6">
                                        <label>User Name</label>
                                        <input className="form-control" type="text" placeholder="username"
                                         onChange={e => setuser({...user ,username : e.target.value})} value={user.userName}></input>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Password</label>
                                        <input className="form-control" type="password" placeholder="Password"
                                         onChange={e => setuser({...user ,password : e.target.value})} value={user.password}></input>
                                    </div>
                                    <div className="col-md-12">
                                        <label>Retype Password</label>
                                        <input className="form-control" type="password" placeholder="Password"
                                        onChange={e => setRetypePassword(e.target.value)} value={RetypePassword}></input>
                                    </div>
                                    {message && (
                                        <div className="error-mesage"><h3>{message}</h3></div>
                                    )}
                                    <div className="col-md-12">
                                        <button className="btn" onClick = {register}>Submit</button>
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
