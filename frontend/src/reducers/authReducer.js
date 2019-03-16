import { USER_LOADING,
         USER_LOADED,
         AUTH_ERROR,
         LOGIN_SUCCESS,
         LOGIN_FAIL,
         LOGOUT_SUCCESS,
         REGISTER_SUCCESS,
         REGISTER_FAIL } from '../actions/types';

const initiatState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}

export default function (state = initiatState, action) {
    switch (action.type){
        case USER_LOADING: // 
            return {
                ...state,
                isLoading: true,
            };

        case USER_LOADED: // run all the time with every request to see "logged in" state
             return {
                 ...state,
                 isAuthenticated: true,
                 isLoading: false,
                 user: action.payload
             };

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        return {
            ...state,
            ...action.payload, //user and token
            isAuthenticated: true,
            isLoading: false,
        };

        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }

        default:
            return state;
    }
}