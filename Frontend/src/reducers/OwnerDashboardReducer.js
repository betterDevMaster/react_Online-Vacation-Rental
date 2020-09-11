import { ERROR, GET_PROPERTYDATA } from '../actions/types';
const initialState = {
    propertyData: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ERROR:
            return {
                ...state,
                propertyData: action.payload
            }
        case GET_PROPERTYDATA:
            return {
                ...state,
                propertyData: action.payload
                //change as needed      //loginData: action.payload
            }
        default:
            return state;
    }
}