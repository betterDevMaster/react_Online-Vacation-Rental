import { SIGNUP_SUCCESS } from '../actions/types';
import { SIGNUP_ERROR } from '../actions/types';

const initialState = {
    signupData: '',
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SIGNUP_SUCCESS:
            return {
                ...state,
                signupData: action.payload
            }
        case SIGNUP_ERROR:
            return {
                ...state,
                signupData: action.payload
            }
        default:
            return state;
    }
}