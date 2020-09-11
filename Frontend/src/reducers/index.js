import { combineReducers } from 'redux';
import { reducer as formReducer } from "redux-form";

import LoginReducer from './LoginReducer';
import SignupReducer from './SignupReducer';
import ProfileReducer from './ProfileReducer';
import HomeReducer from './HomeReducer';
import BookingDetailsReducer from './BookingDetailsReducer';
import MyTripsReducer from './MyTripsReducer';
import PropertyListingReducer from './PropertyListingReducer';
import OwnerDashboardReducer from './OwnerDashboardReducer';
import InboxReducer from './InboxReducer';



const rootReducer = combineReducers({
    login: LoginReducer,
    form: formReducer,
    signup: SignupReducer,
    profile: ProfileReducer,
    home: HomeReducer,
    booking: BookingDetailsReducer,
    trips: MyTripsReducer,
    property: PropertyListingReducer,
    ownerdashboard: OwnerDashboardReducer,
    inbox: InboxReducer
});
export default rootReducer;