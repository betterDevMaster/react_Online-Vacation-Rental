import { ERROR, GET_MYTRIPSDATA } from '../actions/types';
const initialState = {
    tripsData: '',
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ERROR:
            return {
                ...state,
                tripsData: action.payload
            }
        case GET_MYTRIPSDATA:
            return {
                ...state,
                tripsData: action.payload
                //change as needed      //loginData: action.payload
            }
        default:
            return state;
    }
}