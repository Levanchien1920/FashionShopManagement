import React, {useState , useContext } from 'react'
import {LoginContext} from '../context/LoginContext'
import axios from 'axios'
import {useHistory} from 'react-router'
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
            LoginDispatch();
            history.push("/admin");
         })
         .catch((error) =>{
            setErrorMessage(error.response.data.message);
        });
    }
    return (
        <form>
            <h1>Welcome To Login</h1>
            <input type="text"  name="username" 
            onChange={e => setuserInput({...userInput ,username : e.target.value})} value={userInput.username}></input>
            <input type="text"  name="password"
            onChange={e => setuserInput({...userInput ,password : e.target.value})} value={userInput.password}></input>
            <button  onClick={OnSubmitHandle}>Submit</button>
            {errorMessage && (
            <div classNameName="error-mesage">{errorMessage}</div>
            )}
        </form>
    )
}
