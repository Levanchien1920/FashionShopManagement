import React from 'react'
import {
    Link,
  } from "react-router-dom";
export default function Header() {
    return (
        <div className="header">
            <ul>
                <li>&#8227; <a href="r" className="a_top_hypers"> Inbox</a></li>
                <li>&#8227; <a href="r" className="a_top_hypers"> Compose</a></li>
                <li>&#8227; <a href="r" className="a_top_hypers"> Reports</a></li>
                <li>&#8227; <a href="e" className="a_top_hypers"> Preferences</a></li>
                <li>&#8227; <Link to="/login" className="header_left">Login</Link></li>
            </ul>

           
        </div>
    )
}
