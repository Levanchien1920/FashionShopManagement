import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router';
import {LoginContext} from '../Context/LoginContext'
export default function Login() {
    const [userInput , setuserInput] = useState({username:"", password:""});
    const [errorMessage, setErrorMessage] = useState(null);
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
            localStorage.setItem("roleNames", info.roleNames);
            LoginDispatch();
        }).catch((error) =>{
            setErrorMessage(error.response.data.message);
        });
    }
    return (
        <div className="login">
            <div className="login-form">
                <h3>Username:</h3>
                <input type="text" placeholder="Username"
                onChange={e => setuserInput({...userInput ,username : e.target.value})} value={userInput.username}/>
                <br></br>
                <h3>Password:</h3>
                <input type="password" placeholder="Password"
                onChange={e => setuserInput({...userInput ,password : e.target.value})} value={userInput.password}/>
                <br></br>
                <input type="button" value="Login" className="login-button"
                onClick={OnSubmitHandle}/>
                <br></br>        
                {errorMessage && (
                    <div className="error-mesage"><h3>{errorMessage}</h3></div>
                )}
            </div>
        </div>
    )
}