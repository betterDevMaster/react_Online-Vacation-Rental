import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Signup from './Signup/Signup';
import OwnerSignup from './OwnerSignup/OwnerSignup';
import PropertyResult from './PropertyResult/PropertyResult';
import Login from './Login/Login';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import OwnerLogin from './OwnerLogin/OwnerLogin';
import OwnerDashboard from './OwnerDashboard/OwnerDashboard';
import ViewProperty from './ViewProperty/ViewProperty';
import MyTrips from './MyTrips/MyTrips';
import PropertyListing from './PropertyListing/PropertyListing';
import BookedProperty from './BookingDetails/BookingDetails';
import Inbox from './Inbox/Inbox';
import OwnerInbox from './OwnerInbox/OwnerInbox';
import MessageBox from './MessageBox/MessageBox';


// import Create from './Create/Create';
// import Navbar2 from './Navbar/Navbar2';
//Create a Main Component
class Main extends Component {
    render() {
        return (
            <div>
                {/* <Navbar2 /> */}
                {/*Render Different Component based on Route*/}
                <Route path="/signup" component={Signup} />
                <Route path="/ownersignup" component={OwnerSignup} />
                <Route path="/login" component={Login} />
                <Route path="/home" component={Home} />
                <Route path="/profile" component={Profile} />
                <Route path="/ownerlogin" component={OwnerLogin} />
                <Route path="/ownerdashboard" component={OwnerDashboard} />
                <Route path="/propertyresults" component={PropertyResult} />
                <Route path="/viewproperty" component={ViewProperty} />
                <Route path="/mytrips" component={MyTrips} />
                <Route path="/propertylisting" component={PropertyListing} />
                <Route path="/propertydetails" component={BookedProperty} />
                <Route path="/inbox" component={Inbox} />
                <Route path="/ownerinbox" component={OwnerInbox} />
                <Route path="/messagebox" component={MessageBox} />





                {/* <Route path="/delete" component={Delete}/>
                <Route path="/create" component={Create}/> */}
            </div>
        )
    }
}
//Export The Main Component
export default Main;