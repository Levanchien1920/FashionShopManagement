import React , {createContext , useState} from 'react';

export const LoginContext = createContext();

const LoginContextProvider =({children}) =>{
    const [Id , setId] = useState("");
    const [Username , setUsername] = useState("");
    const [Fullname , setfullname] = useState("");
    
    // function dispatch
    const LoginDispatch = () =>{
        setId(localStorage.getItem('id'));
        setUsername(localStorage.getItem('username'));
        setfullname(localStorage.getItem('fullname'));
    }
    const LogoutDispatch = () =>{
        setId("");
        setUsername("");
        setfullname("");
        localStorage.removeItem('id');
        localStorage.removeItem('username');
        localStorage.removeItem('fullname');
        localStorage.removeItem('token');
    }
    //context data
    const LoginContextData = {
        Id : Id,
        Username :Username , 
        Fullname :Fullname , 
        LoginDispatch,
        LogoutDispatch,
    }
    
    //return provider

    return(
        <LoginContext.Provider value={LoginContextData}>
            {children}
        </LoginContext.Provider>
    )

}
export default LoginContextProvider;