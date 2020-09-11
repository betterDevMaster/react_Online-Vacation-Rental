import { ERROR, GET_PROPERTYLIST } from './types';
import axios from 'axios';

const ROOT_URL = "http://localhost:3001";


export const getPropertyData = (data) => {
    return async dispatch => {
        console.log("data+++Email " + data)
        axios.defaults.withCredentials = true;
        const res = await axios
            .get(`${ROOT_URL}/propertylisting/${data}`)
        // .then(res => res.json())
        // .then((res) => {
        console.log("res.data." + res.data)

        if (res.status === 200) {
            dispatch({
                type: GET_PROPERTYLIST,
                payload: res.data
            })
        }
        else {
            console.log("res " + res)
            dispatch({
                type: ERROR,
                payload: 'Property Data Not Found'
            })

        }
    }
}
