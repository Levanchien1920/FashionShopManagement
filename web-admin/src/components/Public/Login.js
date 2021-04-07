import React from 'react'

export default function Login() {
    return (
        <div class="login">
            <div class="login-form">
                <h3>Username:</h3>
                <input type="text" placeholder="Username"/>
                <br></br>
                <h3>Password:</h3>
                <input type="password" placeholder="Password"/>
                <br></br>
                <input type="button" value="Login" class="login-button"/>
                <br></br>        
                <h6 class="no-access">Can't access your account?</h6>
            </div>
        </div>
    )
}
