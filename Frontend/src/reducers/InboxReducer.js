import { ERROR, GET_MESSAGEDATA, GET_CHATDATA, GET_MESSAGEBOX } from '../actions/types';
const initialState = {
    messageData: '',
    chatData: ''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ERROR:
            return {
                ...state,
                messageData: action.payload
            }
        case GET_MESSAGEDATA:
            return {
                ...state,
                messageData: action.payload
                //change as needed      //loginData: action.payload
            }
        case GET_CHATDATA:
            return {
                ...state,
                chatData: action.payload
            }
        case GET_MESSAGEBOX:
            return {
                ...state,
                messageBox: action.payload
            }
        default:
            return state;
    }
}