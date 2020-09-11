import { ERROR, GET_PROPERTYLIST } from '../actions/types';
const initialState = {
    propertyListData: '',
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ERROR:
            return {
                ...state,
                propertyListData: action.payload
            }
        case GET_PROPERTYLIST:
            return {
                ...state,
                propertyListData: action.payload
                //change as needed      //loginData: action.payload
            }
        default:
            return state;
    }
}