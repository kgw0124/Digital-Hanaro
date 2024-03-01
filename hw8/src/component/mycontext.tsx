import { useReducer, useEffect, useState } from "react";
import { StateType, LoginAction } from "../type/commonType";
import { createContext, Dispatch } from "react";

const initalState:StateType={userid:"", username:"", isLogin:false}

function LoginReducer(state:StateType, action:LoginAction):StateType
{
    switch(action.type)
    {
        case "LOGIN":
            {
                let newState =  {...state, userid:action.value.userid, username:action.value.username, isLogin:true};
                saveStateToLocalStorage("appState", newState);
                return newState;     
            }
        case "LOGOUT":
            {
                let newState =  {...state, userid:"", username:"", isLogin:false};
                saveStateToLocalStorage("appState", newState);
                return newState;
            }
        case "RESET":
            return initalState;
        default:
            throw new Error("알 수 없는 액션입니다.");     
    }
}

const AppProvider = ({children}:{children:any})=>{
    const [state, dispatch] = useReducer(LoginReducer, initalState);

    useEffect(() => {
        const savedState = getStateFromLocalStorage("appState");
        if (savedState) {
            dispatch({ type: "LOGIN", value: savedState });
        }
    }, []);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}

const AppContext = createContext<{state:StateType, dispatch:Dispatch<LoginAction>}>({state:initalState, dispatch:()=>null});

const saveStateToLocalStorage = (key:string, state:any)=>{
    localStorage.setItem(key, JSON.stringify(state)); 
}

const getStateFromLocalStorage = (key:string)=>{
    const savedState = localStorage.getItem(key);
    return savedState? JSON.parse(savedState):{};
}

export{AppContext, AppProvider, saveStateToLocalStorage, getStateFromLocalStorage}; 


