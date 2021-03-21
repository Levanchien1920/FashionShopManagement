import React, {useState , useContext } from 'react'
import {LoginContext} from '../context/LoginContext'
import axios from 'axios'
import {useHistory} from 'react-router'
function Login() {
    const [userInput , setuserInput] = useState({username:"", password:""});
    const [errorMessage, setErrorMessage] = useState(null);
    const [user, setuser]= useState("")
    const { LoginDispatch} = useContext(LoginContext);
    const history = useHistory();
    const OnSubmitHandle =  (e) =>{
        axios.post("http://localhost:9090/api/v1/auth/login", userInput).then((response)=> {
            setErrorMessage(null);
            const {token, info} = response.data;
            localStorage.setItem("token", token);
            localStorage.setItem("id", info.id);
            localStorage.setItem("username", info.username);
            localStorage.setItem("fullname", info.fullName);
            LoginDispatch();
        }).catch((error) =>{
            setErrorMessage(error.response.data.message);
        });
    }
    return (
        <div>
            <div class="breadcrumb-wrap">
                <div class="container-fluid">
                    <ul class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item"><a href="#">Products</a></li>
                        <li class="breadcrumb-item active">Login</li>
                    </ul>
                </div>
            </div>
            <div class="login">
                <div class="container-fluid">
                        <div class="col-lg-6">
                            <div class="login-form">
                                <div class="col">
                                    <div class="col-md-6">
                                        <label>Username</label>
                                        <input class="form-control" type="text"  name="username" placeholder="Username" 
                                        onChange={e => setuserInput({...userInput ,username : e.target.value})} value={userInput.username}></input>
                                    </div>
                                    <div class="col-md-6">
                                        <label>Password</label>
                                        <input class="form-control" type="text"  name="password" placeholder="Password"  
                                        onChange={e => setuserInput({...userInput ,password : e.target.value})} value={userInput.password}></input>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="newaccount"></input>
                                            <label class="custom-control-label" for="newaccount">Keep me signed in</label>
                                        </div>
                                    </div>
                                    {errorMessage && (
                                        <div className="error-mesage">{errorMessage}</div>
                                    )}
                                    <div class="col-md-12">
                                        <button class="btn" onClick={OnSubmitHandle}>Submit</button>
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
