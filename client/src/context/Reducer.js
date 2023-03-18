import { CLEAR_ALERT, DISPLAY_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_ERROR, REGISTER_USER_SUCCESS, LOGIN_USER_BEGIN, LOGIN_USER_ERROR, LOGIN_USER_SUCCESS, TOGGLE_SIDEBAR, LOGOUT_USER, UPDATE_USER_BEGIN, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR, HANDLE_JOB_FORM, CLEAR_JOB_FORM, CREATE_JOB_BEGIN, CREATE_JOB_SUCCESS, CREATE_JOB_ERROR, GET_ALL_JOBS_BEGIN, GET_ALL_JOBS_SUCCESS, SET_EDIT_JOB } from "./action";
import { initialAppInfo } from "./appContext";

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
        };
    }
    if (action.type === LOGIN_USER_BEGIN) {
        return {
            ...state,
            isLoading: true,
        };
    }
    if (action.type === LOGIN_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            user: action.payload.user,
            token: action.payload.token,
            showAlert: true,
            alertType: 'success',
            alertText: 'Login successful! Redirecting...',
        };
    } 
    if (action.type === LOGIN_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: `Something went wrong: ${action.payload.msg}`,
        };
    }   
    if (action.type === TOGGLE_SIDEBAR) {
        return {
            ...state,
            showSidebar: !state.showSidebar,
        };
    }
    if (action.type === LOGOUT_USER) {
        return {
            ...initialAppInfo,
            user: null,
            token: null,
        };
    }
    if (action.type === UPDATE_USER_BEGIN) {
        return {
            ...state,
            isLoading: true,
        };
    }    
    if (action.type === UPDATE_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            user: action.payload.user,
            token: action.payload.token,
            showAlert: true,
            alertType: 'success',
            alertText: 'Update Successful!',
        };
    }  
    if (action.type === UPDATE_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: `Something went wrong: ${action.payload.msg}`,
        };
    }
    if (action.type === HANDLE_JOB_FORM) {
        return {
            ...state,
            [action.payload.propertyName]: action.payload.propertyValue,
        };
    }
    if (action.type === CLEAR_JOB_FORM) {
        return {
            ...state,
            // reset all job-related states to default
            isEditingJob: false,
            editJobId: '',
            position: '',
            company: '',
            jobLocation: '',
            jobTypeOptions: ['full-time', 'part-time', 'internship'],
            jobType: 'full-time',
            statusOptions: ['interviewing', 'declined', 'pending', 'accepted'],
            status: 'pending',
        };
    }
    if (action.type === CREATE_JOB_BEGIN) {
        return {
            ...state,
            isLoading: true,
        };
    }    
    if (action.type === CREATE_JOB_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'New Job Created!',
        };
    }  
    if (action.type === CREATE_JOB_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: `Something went wrong: ${action.payload.msg}`,
        };
    }
    if (action.type === GET_ALL_JOBS_BEGIN) {
        return {
            ...state,
            isLoading: true,
        };
    }
    if (action.type === GET_ALL_JOBS_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            jobs: action.payload.jobs,
            totalJobs: action.payload.totalJobs,
            numPages: action.payload.numPages,
        };
    }
    if (action.type === SET_EDIT_JOB) {
        return {
            ...state, 
            isEditingJob: true,
            editJobId: action.payload._id,
            position: action.payload.position,
            company: action.payload.company, 
            jobLocation: action.payload.jobLocation,
            jobType: action.payload.jobType, 
            status: action.payload.status,
        };
    }
    throw new Error(`No such action: ${action}`);
};

export { appInfoReducer };