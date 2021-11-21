import React, { useEffect, useState } from "react";
import { createContext, useReducer } from "react"
import Reducer from "./Reducer";
import axios from 'axios';


const INITIAL_STATE = {
    user: null,
    isFetching: false,
    error: false
}

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
    
    useEffect(()=> {
        
        const getUser = async()=> {

            const jwt = localStorage.getItem('jwt');
            if (jwt) {

                try {
                    dispatch({type: "LOGIN_START"})
                    let res = await axios.post('/tokenCheck',{
                        inputToken: jwt
                    });
                    console.log(res);
                    dispatch({type: "LOGIN_SUCCESS", payload: res.data.foundUser})
                   
                } catch (err) {
                    dispatch({type: "LOGIN_FAILURE"})
                    localStorage.removeItem('jwt');
                }
            } 
        }
        getUser();
        
    },[])

    
    return ( <Context.Provider value = {
        {
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch
        }
    }> { children } </Context.Provider>
)

}