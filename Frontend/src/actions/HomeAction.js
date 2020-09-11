import { ERROR, GET_USERDATA, GET_SEARCHDATA } from './types';
import axios from 'axios';

const ROOT_URL = "http://localhost:3001";


export const getSearchData = (values) => {
    return dispatch => {
        // axios.defaults.withCredentials = true;
        // const res = await axios
        //     .post(`${ROOT_URL}/searchproperty`, values)
        // // .then(res => res.json())
        // // .then((res) => {
        // console.log("res.data." + res.data)

        // if (res.status === 200) {
        //     dispatch({
        //         type: GET_SEARCHDATA,
        //         payload: res.data
        //     })
        // }
        // else {
        console.log("res " + values.data.property)
        dispatch({
            type: GET_SEARCHDATA,
            payload: values.data.property
        })

    }
}
export const userEnteredData = (values) => dispatch => {
    if (values) {
        dispatch({
            type: GET_USERDATA,
            payload: values
        })
    }
    else {
        dispatch({
            type: GET_USERDATA,
            payload: null
        })

    }


}