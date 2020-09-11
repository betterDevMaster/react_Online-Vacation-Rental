import { ERROR, GET_MESSAGEDATA, GET_CHATDATA, SEND_MESSAGE_T, GET_MESSAGEBOX } from './types';
import axios from 'axios';

const ROOT_URL = "http://localhost:3001";


export const sendMessage = (message) => {
    return async (dispatch) => {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${ROOT_URL}/message`, message)
        // .then(res => res.json())
        // .then((res) => {
        console.log("res.data." + res.data)
        if (res.status === 200) {
            dispatch({
                type: GET_MESSAGEDATA,
                payload: res.data
            })
        }
        else {
            console.log("res " + res)
            dispatch({
                type: ERROR,
                payload: 'Booking Data Not Found'
            })

        }
    }
}

export const getChatHistory = (data) => {
    return async (dispatch) => {
        // console.log("document.cookie" + document.)
        console.log("data" + JSON.stringify(data))
        axios.defaults.withCredentials = true;
        const res = await axios
            .get(`${ROOT_URL}/chatmessage/${data}`)
        // .then(res => res.json())
        // .then((res) => {
        console.log("res.data." + res.data)

        if (res.status === 200) {
            dispatch({
                type: GET_CHATDATA,
                payload: res.data
            })
        }
        else {
            console.log("res " + res)
            dispatch({
                type: ERROR,
                payload: 'Booking Data Not Found'
            })

        }
    }
}

export const getMessageBox = (data) => {
    return async (dispatch) => {
        console.log("data getMessageBox" + data)
        axios.defaults.withCredentials = true;
        const res = await axios
            .post(`${ROOT_URL}/messagebox`, data)
        // .then(res => res.json())
        // .then((res) => {
        console.log("res.data." + res.data)

        if (res.status === 200) {
            dispatch({
                type: GET_MESSAGEBOX,
                payload: res.data
            })
        }
        else {
            console.log("res " + res)
            dispatch({
                type: ERROR,
                payload: 'Booking Data Not Found'
            })

        }
    }
}
export const sendMessagefromT = (data) => {
    return async (dispatch) => {
        console.log("data sendMessagefromT" + data)
        axios.defaults.withCredentials = true;
        const res = await axios
            .post(`${ROOT_URL}/messagefromt`, data)
        // .then(res => res.json())
        // .then((res) => {
        console.log("res.data." + res.data)

        if (res.status === 200) {
            dispatch({
                type: SEND_MESSAGE_T,
                payload: res.data
            })
        }
        else {
            console.log("res " + res)
            dispatch({
                type: ERROR,
                payload: 'Booking Data Not Found'
            })

        }
    }
}

