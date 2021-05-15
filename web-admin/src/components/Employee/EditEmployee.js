import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router';

export default function EditEmployee() {
    const history=useHistory();
    const [user , setuser] = useState({
        username: "",
        password: "",
        fullname: "",
        address: "",
        email: "",
        phoneNumber: "",
        id_role : 2,
    });
    const [message , setmessage] = useState("")
    const [RetypePassword, setRetypePassword] = useState("");
    const edit =  (e) =>{
        let array = window.location.pathname.split("/");
        if( user.fullname === "" || user.phone_number === "" || user.password === "" || user.address === "" || user.email === "" || user.username === "" || RetypePassword ==="" ) {
            setmessage("You have not entered enough");
        }else {
            if(RetypePassword !== user.password){
                setmessage(" Retype Password Don't Correct ");
            }
            else {
                let token = {
                    headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
                }
                axios.patch(`http://localhost:9090/api/v1/admin/user/${array[array.length -1]}`, user , token).then((response)=> {
                    alert(response.data.message);
                    history.push("/employee")
                }).catch((error) =>{
                    alert(error.data.message);
                });
            }
        }
    }
    return (
        <div className="page-wrapper">
        <div className="page-breadcrumb">
            <div className="row">
                <div className="col-5 align-self-center">
                    <h4 className="page-title">New Employee</h4>
                </div>
                <div className="col-7 align-self-center">
                    <div className="d-flex align-items-center justify-content-end">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <a href="#">Home</a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Edit Employee</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="card card-body">
                        <h4 className="card-title">New</h4>
                        <form className="form-horizontal m-t-30">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input type="text" className="form-control"
                                onChange={e => setuser({...user ,fullname : e.target.value})} value={user.fullName}></input>
                            </div>
                            <div className="form-group">
                                <label>User Name</label>
                                <input type="text" className="form-control"
                                onChange={e => setuser({...user ,username : e.target.value})} value={user.userName}></input>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="text" className="form-control" 
                                onChange={e => setuser({...user ,email : e.target.value})} value={user.email}/>
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input type="text" className="form-control" 
                                onChange={e => setuser({...user ,address : e.target.value})} value={user.address}/>
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="text" className="form-control"
                                onChange={e => setuser({...user ,phoneNumber : e.target.value})} value={user.phoneNumber}></input>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" 
                                onChange={e => setuser({...user ,password : e.target.value})} value={user.password}></input>
                            </div>
                            <div className="form-group">
                                <label>Retype Password</label>
                                <input type="password" className="form-control" 
                                onChange={e => setRetypePassword(e.target.value)} value={RetypePassword}></input>
                            </div>
                            <div className="form-group">
                                    {message && (
                                        <div className="error-mesage"><h3>{message}</h3></div>
                                    )}
                                <button type="button" name="example-email" className="btn" onClick={edit}>Save </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
