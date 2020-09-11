// import { gql } from 'apollo-boost';
import gql from 'graphql-tag';

const getLoginQuery = gql`
query user($email: String,$password:String) {
    user(email: $email,password:$password) {
        error,
        jwttoken
    }
   }`

const getSearchQuery = gql`
query property($location: String,$arrivaldate:String,$departdate:String,$guests:String) {
    property(location: $location,arrivaldate:$arrivaldate,departdate:$departdate,guests:$guests) {
        id,
        headline,
        propertydescription,
        type,
        bedroom,
        bathroom,
        accomodates,
        price
    }
   }`

const getOwnerBooking = gql`
   query ownerbooking($email: String) {
    ownerbooking(email: $email) {
        location,
        fromdate,
        todate,
        guests,
        owneremail,
        propertydescription,
        prp_headline,
        property_id,
        prp_state
       }
      }`

const getTravelerBooking = gql`
      query travelerbooking($email: String) {
        travelerbooking(email: $email) {
           location,
           fromdate,
           todate,
           guests,
           owneremail,
           propertydescription,
           prp_headline,
           prp_streetaddress,
           id
          }
         }`
export { getLoginQuery, getSearchQuery, getOwnerBooking, getTravelerBooking };