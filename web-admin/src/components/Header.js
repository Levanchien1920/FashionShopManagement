import React, {useContext, useEffect} from 'react'
import {Link , useHistory} from 'react-router-dom'
import {LoginContext} from '../context/LoginContext'
export default function Header() {
    const login = useContext(LoginContext);
    var fullname = login.Fullname;
    const history = useHistory();
    useEffect(() => {
           login.LoginDispatch();
           localStorage.setItem("fulln", fullname);
    }, [fullname])
    const LogoutHandle = () =>{
        login.LogoutDispatch();
        history.push("/");
    }
    return (
        <div className="header">
            <ul>
                <li>&#8227; <a href="r" className="a_top_hypers"> Inbox</a></li>
                <li>&#8227; <a href="r" className="a_top_hypers"> Compose</a></li>
                <li>&#8227; <a href="r" className="a_top_hypers"> Reports</a></li>
                <li>&#8227; <a href="e" className="a_top_hypers"> Preferences</a></li>
                {(fullname == null) ? (
                     <li>&#8227; <Link to="/login" className="header_left">Login</Link></li>
                ) : (
                <>
                 <h1 className="header_left" > hi:{fullname}</h1>
                <button className="header_left" onClick={LogoutHandle} >Logout</button>
                </>
                )}
               
            </ul>
        </div>
    )
}
