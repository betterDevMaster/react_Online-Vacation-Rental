import { ERROR, GET_MYTRIPSDATA } from './types';
import axios from 'axios';

const ROOT_URL = "http://localhost:3001";


export const getTripsData = (data) => {
    return async dispatch => {
        axios.defaults.withCredentials = true;
        const res = await axios
            .get(`${ROOT_URL}/bookedtrips/${data}`)
        // .then(res => res.json())
        // .then((res) => {
        console.log("res.data." + res.data)

        if (res.status === 200) {
            dispatch({
                type: GET_MYTRIPSDATA,
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
