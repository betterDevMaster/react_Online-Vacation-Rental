import { LOGIN_ERROR } from '../actions/types';
import { LOGIN_SUCCESS } from '../actions/types';

const initialState = {
    loginData: '',
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_ERROR:
            return {
                ...state,
                loginData: action.payload
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loginData: action.payload
            }
        default:
            return state;
    }
}