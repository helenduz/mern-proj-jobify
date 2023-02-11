// need to provide context for general state of app, and this state is managed by a reducer
import React, { useReducer, useContext } from "react";
import { appInfoReducer } from "./reducer";
import { CLEAR_ALERT, DISPLAY_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_ERROR, REGISTER_USER_SUCCESS, LOGIN_USER_BEGIN, LOGIN_USER_ERROR, LOGIN_USER_SUCCESS } from "./action";
import axios from "axios";

const userLocal = localStorage.getItem('user');
const tokenLocal = localStorage.getItem('token');

const initialAppInfo = {
    isLoading: false,
    showAlert: false,
    alertType: '',
    alertText: '',
    user: userLocal ? JSON.parse(userLocal) : null,
    token: tokenLocal,
    userLocation: '',
    jobLocation: '',
};

const addToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
};

const removeFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
}

// context for app info and its dispatch function
// we did not use the dispatch context but kept for potential future use
const AppInfoContext = React.createContext(null);
const DispatchContext = React.createContext(null);

const AppProvider = ({ children }) => {
    const [appInfo, dispatch] = useReducer(appInfoReducer, initialAppInfo)

    // Pre-set handlers for updating appInfo -> they will be available as part of the context
    const displayAlert = () => {
        dispatch({
            type: DISPLAY_ALERT,
        })
    };

    const clearAlert = () => {
        dispatch({
            type: CLEAR_ALERT,
        })
    };

    const registerUser = async (currentUser) => {
        // setting isLoading state
        dispatch({
            type: REGISTER_USER_BEGIN,
        });
        try {
            // calls to backend APIs
            const response = await axios.post('/api/v1/auth/register', currentUser);
            // setting user info states
            const { user, token } = response.data; 
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: {
                    user,
                    token,
                }
            });
            // add response data to local storage
            addToLocalStorage({ user, token });
        } catch (error) {
            console.log(error.response);
            // setting isLoading and alert states
            dispatch({
                type: REGISTER_USER_ERROR,
                payload: {
                    msg: error.response.data.msg,
                }
            });
        }
        // clearing alert (should happen regardless of success of error!)
        //clearAlert();
    };

    const loginUser = async (currentUser) => {
        // same logic as registerUser!
        dispatch({
            type: LOGIN_USER_BEGIN,
        });
        try {
            const response = await axios.post('/api/v1/auth/login', currentUser);
            const { user, token } = response.data; 
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: {
                    user,
                    token,
                }
            });
            addToLocalStorage({ user, token });
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: LOGIN_USER_ERROR,
                payload: {
                    msg: error.response.data.msg,
                }
            });
        }
    };

    return (
        // expand the state obj appInfo so that we can directly access fields in the consumers
        <AppInfoContext.Provider value={{...appInfo, displayAlert, clearAlert, registerUser, loginUser}}>
            <DispatchContext.Provider value={dispatch}>
            {children}
            </DispatchContext.Provider>
        </AppInfoContext.Provider>
    );
};

// hooks for the app info and dispatch contexts such that components can access the context
// these are called custom hooks -> if you don't create them, you'd have to import AppContext and useContext every time you are in a child component that needs to access the AppInfo state, this is just a cleaner way of writing
// note that for useContext to work in custom hooks, your custom hook names must start with "use"
const useAppContext = () => {
    return useContext(AppInfoContext);
};

const useAppDispatchContext = () => {
    return useContext(DispatchContext);
};

export { AppProvider, useAppContext, useAppDispatchContext };