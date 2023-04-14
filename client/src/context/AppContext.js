// need to provide context for general state of app, and this state is managed by a reducer
import React, { useReducer, useContext } from "react";
import { appInfoReducer } from "./reducer";
import {
    CLEAR_ALERT,
    DISPLAY_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS,
    LOGIN_USER_BEGIN,
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    HANDLE_FORM_CHANGE,
    CLEAR_JOB_FORM,
    CREATE_JOB_BEGIN,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_ERROR,
    GET_ALL_JOBS_BEGIN,
    GET_ALL_JOBS_SUCCESS,
    SET_EDIT_JOB,
    DELETE_JOB_BEGIN,
    EDIT_JOB_BEGIN,
    EDIT_JOB_SUCCESS,
    EDIT_JOB_ERROR,
    SHOW_STATS_BEGIN,
    SHOW_STATS_SUCCESS,
    CLEAR_SEARCH_FORM,
    CHANGE_PAGE,
} from "./action";
import axios from "axios";
import {
    getAuthFetchInstance,
    setAuthFetchInstanceInterceptors,
} from "../util/axiosConfig";

const userLocal = localStorage.getItem("user");
const tokenLocal = localStorage.getItem("token");

const initialAppInfo = {
    isLoading: false,
    showAlert: false,
    alertType: "",
    alertText: "",
    user: userLocal ? JSON.parse(userLocal) : null,
    token: tokenLocal,
    // userLocation: '',
    showSidebar: false,
    // job related states
    isEditingJob: false,
    editJobId: "",
    position: "",
    company: "",
    jobLocation: "",
    jobTypeOptions: ["full-time", "part-time", "internship"],
    jobType: "full-time",
    statusOptions: ["interviewing", "declined", "pending", "accepted"],
    status: "pending",
    jobs: [],
    totalJobs: 0,
    page: 1,
    numPages: 0,
    stats: {},
    monthlyApplications: [],
    // search/sort related states
    searchField: "",
    searchJobType: "all",
    searchStatus: "all",
    sort: "latest",
    sortOptions: ["latest", "oldest", "company (A-Z)", "company (Z-A)"],
};

const addToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
};

const removeFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
};

// context for app info and its dispatch function
// we did not use the dispatch context but kept for potential future use
const AppInfoContext = React.createContext(null);
const DispatchContext = React.createContext(null);

const AppProvider = ({ children }) => {
    const [appInfo, dispatch] = useReducer(appInfoReducer, initialAppInfo);

    // Pre-set handlers for updating appInfo -> they will be available as part of the context
    const displayAlert = () => {
        dispatch({
            type: DISPLAY_ALERT,
        });
    };

    const clearAlert = () => {
        dispatch({
            type: CLEAR_ALERT,
        });
    };

    const registerUser = async (currentUser) => {
        // setting isLoading state
        dispatch({
            type: REGISTER_USER_BEGIN,
        });
        try {
            // calls to backend APIs
            const response = await axios.post(
                "/api/v1/auth/register",
                currentUser
            );
            // setting user info states
            const { user, token } = response.data;
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: {
                    user,
                    token,
                },
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
                },
            });
        }
        // clearing alert (should happen regardless of success of error!)
        // this is because we will use the showAlert state after register/login in other places and so we must reset the related states!
        setTimeout(clearAlert, 3000);
    };

    const loginUser = async (currentUser) => {
        // same logic as registerUser!
        dispatch({
            type: LOGIN_USER_BEGIN,
        });
        try {
            const response = await axios.post(
                "/api/v1/auth/login",
                currentUser
            );
            const { user, token } = response.data;
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: {
                    user,
                    token,
                },
            });
            addToLocalStorage({ user, token });
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: LOGIN_USER_ERROR,
                payload: {
                    msg: error.response.data.msg,
                },
            });
        }
        setTimeout(clearAlert, 3000);
    };

    const toggleSidebar = () => {
        dispatch({
            type: TOGGLE_SIDEBAR,
        });
    };

    const logoutUser = () => {
        dispatch({
            type: LOGOUT_USER,
        });
        removeFromLocalStorage();
    };

    const updateUser = async (currentUser) => {
        // logic is same as login/register except for request
        dispatch({
            type: UPDATE_USER_BEGIN,
        });
        try {
            const authFetchInstance = getAuthFetchInstance(appInfo.token);
            setAuthFetchInstanceInterceptors(authFetchInstance, logoutUser);
            const response = await authFetchInstance.patch(
                "/auth/updateUser",
                currentUser
            );
            const { user, token } = response.data;
            console.log(user);
            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: {
                    user,
                    token,
                },
            });
            addToLocalStorage({ user, token });
        } catch (error) {
            // we don't actually have to do any error handling here
            // interceptor should have already taken care of them!
            // only need to update view accordingly
            console.log(error.response);
            // if 401 error user will be directly logged out (by interceptor)
            // no need to display alert
            if (error.response.status !== 401) {
                dispatch({
                    type: UPDATE_USER_ERROR,
                    payload: {
                        msg: error.response.data.msg,
                    },
                });
            }
        }
        setTimeout(clearAlert, 3000);
    };

    const handleFormChange = ({ propertyName, propertyValue }) => {
        dispatch({
            type: HANDLE_FORM_CHANGE,
            payload: {
                propertyName,
                propertyValue,
            },
        });
    };

    const clearJobForm = () => {
        dispatch({
            type: CLEAR_JOB_FORM,
        });
    };

    const createJob = async () => {
        // setting isLoading state
        dispatch({
            type: CREATE_JOB_BEGIN,
        });

        const { position, company, jobLocation, jobType, status } = appInfo;

        try {
            const authFetchInstance = getAuthFetchInstance(appInfo.token);
            setAuthFetchInstanceInterceptors(authFetchInstance, logoutUser);
            await authFetchInstance.post("/jobs/", {
                position,
                company,
                jobLocation,
                jobType,
                status,
            });

            dispatch({
                type: CREATE_JOB_SUCCESS,
            });
            dispatch({
                type: CLEAR_JOB_FORM,
            });
        } catch (error) {
            if (error.response.status !== 401) {
                dispatch({
                    type: CREATE_JOB_ERROR,
                    payload: {
                        msg: error.response.data.msg,
                    },
                });
            }
        }
        setTimeout(clearAlert, 3000);
    };

    const getAllJobs = async () => {
        // we could pass in numJobsPerPage to backend if we want!
        const { searchField, searchJobType, searchStatus, sort, page } =
            appInfo;
        // required query string params: searchJobType, searchStatus, sort
        let url = `/jobs?status=${searchStatus}&jobType=${searchJobType}&sort=${sort}&page=${page}`;
        // optional query string param: searchField
        if (searchField) {
            url = url + `&searchField=${searchField}`;
        }

        dispatch({
            type: GET_ALL_JOBS_BEGIN,
        });

        try {
            const authFetchInstance = getAuthFetchInstance(appInfo.token);
            setAuthFetchInstanceInterceptors(authFetchInstance, logoutUser);
            // remember fetch gives us HTML message and we look for the data field
            const { data } = await authFetchInstance.get(url);
            const { jobs, totalJobs, numPages } = data;

            dispatch({
                type: GET_ALL_JOBS_SUCCESS,
                payload: {
                    jobs,
                    totalJobs,
                    numPages,
                },
            });
        } catch (error) {
            console.log(error.response);
            // logoutUser()
        }
    };

    const setEditJob = (id) => {
        const job = appInfo.jobs.find((el) => el._id === id);
        console.log(job);
        const { _id, position, company, jobLocation, jobType, status } = job;
        dispatch({
            type: SET_EDIT_JOB,
            payload: {
                _id,
                position,
                company,
                jobLocation,
                jobType,
                status,
            },
        });
    };

    const editJob = async () => {
        // same logic as createJob
        dispatch({
            type: EDIT_JOB_BEGIN,
        });

        const { position, company, jobLocation, jobType, status, editJobId } =
            appInfo;

        try {
            const authFetchInstance = getAuthFetchInstance(appInfo.token);
            setAuthFetchInstanceInterceptors(authFetchInstance, logoutUser);
            await authFetchInstance.patch(`/jobs/${editJobId}`, {
                position,
                company,
                jobLocation,
                jobType,
                status,
            });

            dispatch({
                type: EDIT_JOB_SUCCESS,
            });
            dispatch({
                type: CLEAR_JOB_FORM,
            });
        } catch (error) {
            if (error.response.status !== 401) {
                dispatch({
                    type: EDIT_JOB_ERROR,
                    payload: {
                        msg: error.response.data.msg,
                    },
                });
            }
        }
        setTimeout(clearAlert, 3000);
    };

    const deleteJob = async (jobId) => {
        dispatch({
            type: DELETE_JOB_BEGIN,
        });

        try {
            const authFetchInstance = getAuthFetchInstance(appInfo.token);
            setAuthFetchInstanceInterceptors(authFetchInstance, logoutUser);
            await authFetchInstance.delete(`/jobs/${jobId}`);
        } catch (error) {
            console.log(error.response);
            // logoutUser();
        }
        getAllJobs();
    };

    const showStats = async () => {
        // similar to getAllJobs()
        dispatch({
            type: SHOW_STATS_BEGIN,
        });

        try {
            const authFetchInstance = getAuthFetchInstance(appInfo.token);
            setAuthFetchInstanceInterceptors(authFetchInstance, logoutUser);
            const { data } = await authFetchInstance.get("/jobs/stats");
            const { stats, monthlyApplications } = data;

            dispatch({
                type: SHOW_STATS_SUCCESS,
                payload: {
                    stats,
                    monthlyApplications,
                },
            });
        } catch (error) {
            console.log(error.response);
            // logoutUser();
        }
    };

    const clearSearchForm = () => {
        dispatch({
            type: CLEAR_SEARCH_FORM,
        });
    };

    const changePage = (page) => {
        dispatch({
            type: CHANGE_PAGE,
            payload: { page },
        });
    };

    return (
        // expand the state obj appInfo so that we can directly access fields in the consumers
        <AppInfoContext.Provider
            value={{
                ...appInfo,
                displayAlert,
                clearAlert,
                registerUser,
                loginUser,
                toggleSidebar,
                logoutUser,
                updateUser,
                handleFormChange,
                clearJobForm,
                createJob,
                getAllJobs,
                setEditJob,
                deleteJob,
                editJob,
                showStats,
                clearSearchForm,
                changePage,
            }}
        >
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

export { AppProvider, useAppContext, useAppDispatchContext, initialAppInfo };
