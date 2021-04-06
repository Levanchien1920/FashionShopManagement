import React, {useState , useContext } from 'react'
import {LoginContext} from '../context/LoginContext'
import axios from 'axios'
import {useHistory} from 'react-router'
import {Link} from 'react-router-dom'
function Login() {
    const [userInput , setuserInput] = useState({username:"", password:""});
    const [errorMessage, setErrorMessage] = useState(null);
    const { LoginDispatch} = useContext(LoginContext);
    const history = useHistory();
    console.log("nfejknvkrj");
    const OnSubmitHandle =  (e) =>{
        axios.post("http://localhost:9090/api/v1/auth/loginCustomer", userInput).then((response)=> {
            setErrorMessage(null);
            const {token, info} = response.data;
            localStorage.setItem("token", token);
            localStorage.setItem("id", info.id);
            localStorage.setItem("username", info.username);
            localStorage.setItem("fullname", info.fullName);
            LoginDispatch();
            history.push("/");
        }).catch((error) =>{
            setErrorMessage(error.response.data.message);
        });
    }
    return (
        <div>
            <div className="breadcrumb-wrap">
                <div className="container-fluid">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to="/products">Products</Link></li>
                        <li className="breadcrumb-item active">Login</li>
                    </ul>
                </div>
            </div>
            <div className="login">
                <div className="container-fluid">
                        <div className="col-lg-6">
                            <div className="login-form">
                                <div className="col">
                                    <div className="col-md-6">
                                        <label>Username</label>
                                        <input className="form-control" type="text"  name="username" placeholder="Username" 
                                        onChange={e => setuserInput({...userInput ,username : e.target.value})} value={userInput.username}></input>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Password</label>
                                        <input className="form-control" type="password"  name="password" placeholder="Password"  
                                        onChange={e => setuserInput({...userInput ,password : e.target.value})} value={userInput.password}></input>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="newaccount"></input>
                                            <label className="custom-control-label" for="newaccount">Keep me signed in</label>
                                        </div>
                                    </div>
                                    {errorMessage && (
                                        <div classNameName="error-mesage">{errorMessage}</div>
                                    )}
                                    <div className="col-md-12">
                                        <button className="btn" onClick={OnSubmitHandle}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Login
