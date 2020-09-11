import { UPDATE_PROFILE, GET_PROFILE } from './types';
import axios from 'axios';

const ROOT_URL = "http://localhost:3001";


export const updateProfile = (data) => {
    return async dispatch => {
        axios.defaults.withCredentials = true;
        const res = await axios
            .post(`${ROOT_URL}/profile`, data)
        // .then((res) => {
        console.log("res" + res)
        console.log("res.value" + res.value)
        console.log("res.value" + res.data)
        if (res.status === 200) {
            dispatch({
                type: UPDATE_PROFILE,
                payload: true
            })
        }
        else {
            console.log("res " + res)
            dispatch({
                type: UPDATE_PROFILE,
                payload: false
            })

        }
    }
}

export const getProfileData = (data) => {
    return async dispatch => {
        console.log("data" + data)
        axios.defaults.withCredentials = true;
        const res = await axios
            .get(`${ROOT_URL}/profile/${data}`)
        // .then((res) => {
        console.log("res" + res)
        console.log("res.value" + res.value)
        console.log("res.value" + res.data)
        if (res.status === 200) {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        }
        else {
            console.log("res " + res)
            dispatch({
                type: GET_PROFILE,
                payload: false
            })

        }
    }
}