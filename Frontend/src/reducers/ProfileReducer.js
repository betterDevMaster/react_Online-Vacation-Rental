import { ERROR } from '../actions/types';
import { UPDATE_PROFILE, GET_PROFILE } from '../actions/types';

const initialState = {
    profileFlag: '',
    profileData: ''

}

export default function (state = initialState, action) {
    switch (action.type) {
        case ERROR:
            return {
                ...state,
                profileFlag: action.payload
            }
        case UPDATE_PROFILE:
            return {
                ...state,
                profileFlag: action.payload
                //change as needed      //loginData: action.payload
            }
        case GET_PROFILE:
            return {
                ...state,
                profileData: action.payload
                //change as needed      //loginData: action.payload
            }
        default:
            return state;
    }
}