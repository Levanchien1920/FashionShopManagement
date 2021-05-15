import API from '../Config/Api'
import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router';
import {LoginContext} from '../Context/LoginContext'
export default function EditCustomer(props) {
    const check = useContext(LoginContext);
    const history = useHistory();
    const [user , setUser] = useState({
        username: "",
        password: "",
        fullname: "",
        address: "",
        email: "",
        phoneNumber: "",
        id_role : 3,
    });
    const [message , setmessage] = useState("")
    const [RetypePassword, setRetypePassword] = useState("");
    const id = props.match.params.id
    const token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
    }
    useEffect(() => {
        check.checklogin();
        API.get('/user/getOneCustomer/' + id, token).then((response)=> {
            console.log(response.data)
            setUser(response.data)
            

        }).catch((error) =>{
        });
    }, []);
    const edit =  (e) =>{

        let array = window.location.pathname.split("/");
        if( user.fullname === "" || user.phone_number === "" || user.password === "" || user.address === "" || user.email === "" || user.username === "" || RetypePassword ==="" ) {
            setmessage("You have not entered enough");
        }else {
            let token = {
                headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
            }
            let customer = {
                username: user.username,
                fullname: user.fullname,
                address: "",
                email: "",
                phoneNumber: "",
                id_role : 3,
            }
            API.patch('user/' + id, user , token).then((response)=> {
                alert(response.data.message);
                history.push("/employee")
            }).catch((error) =>{
                alert(error.data.message);
            });
        }
        
    }
    return (
        <div className="page-wrapper">
        <div className="page-breadcrumb">
            <div className="row">
                <div className="col-5 align-self-center">
                    <h4 className="page-title">Edit Customer</h4>
                </div>
                <div className="col-7 align-self-center">
                    <div className="d-flex align-items-center justify-content-end">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <a href="#">Home</a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Edit Customer</li>
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
                                onChange={e => setUser({...user ,fullname : e.target.value})} value={user.fullName}></input>
                            </div>
                            <div className="form-group">
                                <label>User Name</label>
                                <input type="text" className="form-control"
                                onChange={e => setUser({...user ,username : e.target.value})} value={user.username}></input>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="text" className="form-control" 
                                onChange={e => setUser({...user ,email : e.target.value})} value={user.email}/>
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input type="text" className="form-control" 
                                onChange={e => setUser({...user ,address : e.target.value})} value={user.address}/>
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="text" className="form-control"
                                onChange={e => setUser({...user ,phoneNumber : e.target.value})} value={user.phoneNumber}></input>
                            </div>

                            <div className="form-group">
                                    {message && (
                                        <div className="error-mesage"><h3>{message}</h3></div>
                                    )}
                                <button type="button" name="example-email" className="btn btn-info" onClick={edit}>Save </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
