import axios from 'axios';
import { USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL } from './types';
import { returnErrors } from './errorAction';
    
    //check token & load user
    export const loadUser = () => ( dispatch, getState ) => {
        // User loading
        dispatch({ type: USER_LOADING});

        // Get token from localStorage
        const token = getState().auth.token;

        // Header
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }

        // If token, add to headers
        if(token) {
            config.headers['x-auth-token'] = token;
        }

        axios.get('/api/auth/user', config)
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data //user & token
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
    }