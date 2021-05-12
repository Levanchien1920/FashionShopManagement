import React, { useContext, useState } from 'react'
import Api from '../Config/Api';
import {LoginContext} from '../Context/LoginContext'
export default function Login() {
    const [userInput , setuserInput] = useState({username:"", password:""});
    const [errorMessage, setErrorMessage] = useState(null);
    const { LoginDispatch} = useContext(LoginContext);
    const OnSubmitHandle =  (e) =>{
        if( userInput.username === ""  || userInput.password === "") {
            setErrorMessage("You have not entered username or password")
        }else{
            Api.post("auth/login", userInput).then((response)=> {
                setErrorMessage(null);
                const {token, info} = response.data;
                if(response.data.info.roleNames[0] === "admin" || response.data.info.roleNames[0] === "employee"){
                    localStorage.setItem("token", token);
                    localStorage.setItem("id", info.id);
                    localStorage.setItem("username", info.username);
                    localStorage.setItem("fullname", info.fullName);
                    localStorage.setItem("roleNames", info.roleNames);
                    setErrorMessage("")
                    LoginDispatch();
                }else{
                    setErrorMessage("acount don't corect")
                }
                
            }).catch((error) =>{
                setErrorMessage( "username or password don't correct" );
            });
        }
       
    }
    const handleKeypress = e => {
        console.log(e);
        //it triggers by pressing the enter key
      if (e.charCode === 13) {
        OnSubmitHandle();
      }
    };
  
    return (
        <div className="login">
            <div className="login-form">
                <h3>Username:</h3>
                <input type="text" placeholder="Username" onKeyPress={handleKeypress}
                onChange={e => setuserInput({...userInput ,username : e.target.value})} value={userInput.username}/>
                <br></br>
                <h3>Password:</h3>
                <input type="password" placeholder="Password" onKeyPress={handleKeypress}
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
