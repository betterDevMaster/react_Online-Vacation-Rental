import { ERROR, GET_USERDATA, GET_SEARCHDATA } from '../actions/types';
const initialState = {
    searchData: '',
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ERROR:
            return {
                ...state,
                searchData: action.payload
            }
        case GET_SEARCHDATA:
            return {
                ...state,
                searchData: action.payload
                //change as needed      //loginData: action.payload
            }
        case GET_USERDATA:
            return {
                ...state,
                userData: action.payload
            }
        default:
            return state;
    }
}