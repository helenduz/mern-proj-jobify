import { CLEAR_ALERT, DISPLAY_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_ERROR, REGISTER_USER_SUCCESS } from "./action";

const appInfoReducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return {
            ...state,
            showAlert: true,
            alertType: 'danger',
            alertText: 'Oops... Please provide all values!'
        };
    }
    if (action.type === CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: '',
            alertText: '',
        };
    } 
    if (action.type === REGISTER_USER_BEGIN) {
        return {
            ...state,
            isLoading: true,
        };
    }
    if (action.type === REGISTER_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            user: action.payload.user,
            token: action.payload.token,
            showAlert: true,
            alertType: 'success',
            alertText: 'Successfully registered! Redirecting...',
        };
    } 
    if (action.type === REGISTER_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: `Something went wrong: ${action.payload.msg}`,
        }
    }
    
    throw new Error(`No such action: ${action}`);
    
};

export { appInfoReducer };