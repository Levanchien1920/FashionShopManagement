import React from 'react'

export default function Login() {
    return (
        <form>
            <h1>Welcome To Login</h1>
            <input placeholder="Username" type="text" required=""></input>
            <input placeholder="Password" type="password" required=""></input>
            <button >Submit</button>
        </form>
    )
}
