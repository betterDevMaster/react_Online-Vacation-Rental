import { gql } from 'apollo-boost';

const addUserMutation = gql`
    mutation addUser($first_name: String, $last_name: String, $email: String, $password: String,$user_type: String){
        addUser(first_name: $first_name, last_name: $last_name, email: $email, password: $password,user_type: $user_type){
            first_name
            email
        }
    }
`;

const bookpropertyMutation = gql`
    mutation bookProperty($location: String, $fromdate: String, $todate: String, $guests: String, $email: String, $property_id:String, $owneremail:String, $prp_headline:String, $prp_state:String, $prp_streetaddress:String, $prp_zipcode:String, $propertydescription:String){
        bookProperty(location: $location, fromdate: $fromdate, todate: $todate, guests: $guests, email: $email, property_id:$property_id, owneremail:$owneremail, prp_headline:$prp_headline, prp_state:$prp_state, prp_streetaddress:$prp_streetaddress, prp_zipcode:$prp_zipcode, propertydescription:$propertydescription){
            location
            fromdate
        }
    }
`;

const updateUser = gql`
mutation updateUser($email: String, $about_me: String, $city: String, $country: String,$school: String,$hometown:String,$languages:String,$gender:String,$company:String){
    updateUser(email: $email, about_me: $about_me, city: $city, country: $country,school: $school,hometown:$hometown,languages:$languages,gender:$gender,company:$company){
        email
        about_me
    }
}
`;

export { addUserMutation, bookpropertyMutation, updateUser };