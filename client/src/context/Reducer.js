import { CLEAR_ALERT, DISPLAY_ALERT } from "./action";

const appInfoReducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return {
            ...state,
            showAlert: true,
            alertType: 'danger',
            alertText: 'Oops... Please provide all values!'
        };
    } else if (action.type === CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: '',
            alertText: '',
        };
    } else {
        throw new Error(`No such action: ${action}`);
    } 
};

export { appInfoReducer };