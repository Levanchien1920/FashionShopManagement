import React, {createContext, useReducer} from 'react';
import homeInitialState from './initialsStates/homeInitialState';
import authInitialState from './initialsStates/authInitialState';
import auth from './reducers/auth';
import home from './reducers/home';


export const GlobalContext =createContext({});

const GlobalProvider=({children}) => {
    const [authState,authDispatch] = useReducer(auth,authInitialState);
    const [homeState,homeDispatch] = useReducer(home,homeInitialState);
    

    return <GlobalContext.Provider 
    value= {{authState,homeState,authDispatch,homeDispatch}}>{children} </GlobalContext.Provider>

    
}

export default GlobalProvider;