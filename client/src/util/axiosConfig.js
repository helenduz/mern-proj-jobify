import axios from "axios";

// Instance for fetching with auth token
const getAuthFetchInstance = (token) => {
    return axios.create({
        baseURL: '/api/v1',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}


// Define interceptors for authFetchInstance
const setAuthFetchInstanceInterceptors = (authFetchInstance, logoutUser) => {
    authFetchInstance.interceptors.response.use(
        (response) => {
            // for success
            return response;
        }, 
        (error) => {
            console.log(error.response);
            if (error.response.status === 401) {
                logoutUser();
                console.log('AUTH ERROR! LOGGED OUT USER');
            }
            // Promise.reject() throws error up the stack
            // this line is needed if you want code that uses this instance to catch the error
            return Promise.reject(error);
        }
     );
};


export { getAuthFetchInstance, setAuthFetchInstanceInterceptors };

