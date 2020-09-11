import { SIGNUP_SUCCESS, SIGNUP_ERROR } from './types';
import axios from 'axios';

const ROOT_URL = "http://localhost:3001";

export const signupUser = (data) => {
    return async dispatch => {
        console.log("data " + data)
        console.log("data " + JSON.stringify(data))
        if (data.usertype === 'owner') {
            console.log("Inside OwnerSignup")
            axios.defaults.withCredentials = true;
            const res = await axios
                .post(`${ROOT_URL}/ownersignup`, data)
            // .then((res) => {
            console.log(res)
            if (res.data === 'Email Already Exist Use Another Email ID to Register!') {
                dispatch({
                    type: SIGNUP_ERROR,
                    payload: false
                })
            } else if (res.status === 200) {
                dispatch({
                    type: SIGNUP_SUCCESS,
                    payload: true
                })
            }
            else {
                console.log("res " + res)
                dispatch({
                    type: SIGNUP_ERROR,
                    payload: false
                })

            }
        }


        else {
            console.log("Inside Signup")

            axios.defaults.withCredentials = true;
            const res = await axios
                .post(`${ROOT_URL}/signup`, data)
            // .then((res) => {
            console.log(res)
            if (res.data === 'Email Already Exist Use Another Email ID to Register!') {
                dispatch({
                    type: SIGNUP_ERROR,
                    payload: false
                })
            } else if (res.status === 200) {
                dispatch({
                    type: SIGNUP_SUCCESS,
                    payload: true
                })
            }
            else {
                console.log("res " + res)
                dispatch({
                    type: SIGNUP_ERROR,
                    payload: false
                })

            }
        }

    }
}

