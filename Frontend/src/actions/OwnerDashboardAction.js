import { ERROR, GET_PROPERTYDATA } from './types';
import axios from 'axios';
import { Redirect } from 'react-router';
import React from 'react';



const ROOT_URL = "http://localhost:3001";


export const getPropertyData = (Values) => {
    return async dispatch => {
        console.log("Values  " + Values)
        console.log("Values property_id  " + Values.email + Values.property_id)
        axios.defaults.withCredentials = true;
        const res = await axios
            .post(`${ROOT_URL}/ownerdashboard`, {
                params: {
                    email: Values.email,
                    property_id: Values.property_id
                }
            })
        // .then(res => res.json())
        // .then((res) => {
        console.log("res.data." + res.data)


        if (res.statusCode === 200 && res.data === "Invalid Token") {
            console.log("Unauthorized Login Login First")
            this.setState({
                redirectVar: <Redirect to="/login" />
            })
        }
        else if (res.status === 200) {
            console.log(JSON.stringify(res.data))
            dispatch({
                type: GET_PROPERTYDATA,
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
