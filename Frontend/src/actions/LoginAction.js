import { LOGIN_SUCCESS, LOGIN_ERROR } from './types';
import axios from 'axios';

const ROOT_URL = "http://localhost:3001";


export const fetchLogin = (values) => {
    return async (dispatch) => {
        axios.defaults.withCredentials = true;
        const request = await axios.post(`${ROOT_URL}/login`, values)
        // .then(res => res.json())
        // .then((res) => {
        console.log("request " + JSON.stringify(request))
        console.log("res.data.token" + request.data.token)
        if (request.status === 200 && request.data.Successful === 'Successful') {
            localStorage.setItem('token', request.data.token);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: true
            })
        }
        if (request.status === 200 && request.data === 'Incorrect Password') {
            dispatch({
                type: LOGIN_ERROR,
                payload: false
            })
        }
        else {
            console.log("res " + request)
            dispatch({
                type: LOGIN_ERROR,
                payload: false
            })

        }

    }


}