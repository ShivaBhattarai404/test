import {createContext} from 'react';

export default createContext({
    isLoggedIn: false,
    token: "",
    setToken: (token)=>{},
    removeToken: ()=>{},
})