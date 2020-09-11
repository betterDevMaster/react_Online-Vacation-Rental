import { ERROR, GET_BOOKINGDATA } from '../actions/types';
const initialState = {
    bookingData: '',
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ERROR:
            return {
                ...state,
                bookingData: action.payload
            }
        case GET_BOOKINGDATA:
            return {
                ...state,
                bookingData: action.payload
                //change as needed      //loginData: action.payload
            }
        default:
            return state;
    }
}