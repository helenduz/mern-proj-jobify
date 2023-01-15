// need to provide context for general state of app, and this state is managed by a reducer
import React, { useReducer, useContext } from "react";
import { appInfoReducer } from "./reducer";
import { CLEAR_ALERT, DISPLAY_ALERT } from "./action";

const initialAppInfo = {
    isLoading: false,
    showAlert: false,
    alertType: '',
    alertText: '',
};

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

    return (
        // expand the state obj appInfo so that we can directly access fields in the consumers
        <AppInfoContext.Provider value={{...appInfo, displayAlert, clearAlert}}>
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