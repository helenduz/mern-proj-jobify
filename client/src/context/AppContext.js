// need to provide context for general state of app, and this state is managed by a reducer
import React, { useReducer, useContext } from "react";
import { contextReducer } from "./Reducer";

const initialAppInfo = {
    isLoading: false,
    showAlert: false,
    alertType: '',
    alertText: '',
};

// context for app info and its dispatch function
const AppContext = React.createContext(null);
const AppDispatchContext = React.createContext(null);

const AppProvider = ({ children }) => {
    const [appInfo, dispatch] = useReducer(contextReducer, initialAppInfo)
    return (
        <AppContext.Provider value={appInfo}>
            <AppDispatchContext.Provider value={dispatch}>
            {children}
            </AppDispatchContext.Provider>
        </AppContext.Provider>
    );
};

// hooks for the app info and dispatch contexts such that components can access the context
// these are called custom hooks -> if you don't create them, you'd have to import AppContext and useContext every time you are in a child component that needs to access the AppInfo state, this is just a cleaner way of writing
// note that for useContext to work in custom hooks, your custom hook names must start with "use"
const useAppContext = () => {
    return useContext(AppContext);
};

const useAppDispatchContext = () => {
    return useContext(AppDispatchContext);
};

export { AppProvider, useAppContext, useAppDispatchContext };

// what is action.js for

// where to put reducer in app context?? and why apart from being able to have one file that contains both? -> nope, you only do this when you want the state and function to modify state (i.e. dispatch) to be a context instead of doing props drilling -> also answers the following qs

// why do we need to give app provider its own component -> why can't you just export AppContext, AppDispatchContext, and use them when you need to overwrite the value? -> you could, this is just cleaner code

// Also, when do you ever want to overwrite the value of a previous AppContext or AppDispatchContext? -> Nope, never, we just use the provider once in the index.js level (wrapping <App/> inside). But we still need to use context since we want to let children nodes access the appInfo state and its manager  