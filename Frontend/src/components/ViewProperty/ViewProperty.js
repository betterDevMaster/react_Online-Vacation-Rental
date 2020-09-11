import React, { Component } from 'react';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import moment from 'moment';
import { connect } from "react-redux";
import TravelerNavbar from '../Navbar/Navbar2';
import jwtdecode from 'jwt-decode';
import { sendMessagefromT } from '../../actions/InboxAction';
import { graphql, compose, withApollo } from 'react-apollo';
import { bookpropertyMutation } from '../../mutation/mutations';
import propTypes from 'prop-types';


var swal = require('sweetalert');



class ViewProperty extends Component {
    state = {}
    constructor(props) {
        super(props);
        this.state = {
            Propertydetails: "",
            price: "",
            type: "",
            bedroom: "",
            accomodates: "",
            bathroom: "",
            min_stays: "",
            propertydescription: "",
            owneremail: "",
            zipcode: "",
            streetaddress: "",
            headline: "",

            location: "",
            checkin: "",
            checkout: "",
            guests: "",
            total: "",
            propertyidReceived: "",
            imageView: [],
            photo_uploads: "",
            token: false,
            currentemail: '',
            username: '',
            message: ''

        }
        this.bookChangeHandler = this.bookChangeHandler.bind(this)
        this.sendMessageHandler = this.sendMessageHandler.bind(this)
        this.onChangeMessage = this.onChangeMessage.bind(this)
    }
    componentWillMount() {
        console.log("localStorage.getItem" + localStorage.getItem("token"))
        if (localStorage.getItem("token")) {
            var decoded = jwtdecode(localStorage.getItem("token"));
            console.log("decoded  " + JSON.stringify(decoded))
            this.setState({
                token: true,
                currentemail: decoded.user.email,
                username: decoded.user.first_name
            })
        }
        console.log("currentemail" + this.state.currentemail)
    }
    componentDidMount() {


        var propertyidValue = this.props.history.location.pathname.substring(14)
        console.log("propertyidValue" + propertyidValue)
        var getval = sessionStorage.getItem("guestsentry")
        // var parseduserdata = JSON.parse(getval)
        console.log("getval " + getval)
        console.log("locacal storage" + JSON.parse(getval));
        console.log("this.props.home.profileData " + JSON.stringify(this.props.newValue.searchData))
        console.log("this.props.newValue.userData " + JSON.stringify(this.props.newValue.userData))



        console.log("lget VAl Location" + this.props.newValue.userData.location);
        this.setState({
            location: this.props.newValue.userData.location,
            checkin: this.props.newValue.userData.arrivaldate,
            checkout: this.props.newValue.userData.departdate,
            guests: this.props.newValue.userData.guests,
            // propertyidValue: this.props.history.location.pathname.substring(14)
        })


        // var date1 = new Date(this.state.checkin);
        // var date2 = new Date(this.state.checkout);
        // var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        // var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        // //alert(diffDays);
        // console.log("subtratc " + typeof (this.state.checkin))
        // console.log("DATE " + typeof (Date.parse(this.state.checkin)))
        console.log("this.state.propertyidValue" + this.state.propertyidValue)

        axios.get(`http://localhost:3001/requestedproperty/${propertyidValue}`)
            .then((response) => {
                this.setState({
                    Propertydetails: response.data,
                });
                console.log("propertydetails" + JSON.stringify(this.state.Propertydetails))
                console.log("propertydetails propertydescription" + this.state.Propertydetails.propertydescription)
                this.setState({
                    price: this.state.Propertydetails.price,
                    type: this.state.Propertydetails.type,
                    bedroom: this.state.Propertydetails.bedroom,
                    accomodates: this.state.Propertydetails.accomodates,
                    bathroom: this.state.Propertydetails.bathroom,
                    min_stays: this.state.Propertydetails.min_stays,
                    propertydescription: this.state.Propertydetails.propertydescription,
                    propertyidReceived: this.state.Propertydetails._id,
                    photo_uploads: this.state.Propertydetails.photo_uploads,
                    streetaddress: this.state.Propertydetails.streetaddress,
                    state: this.state.Propertydetails.state,
                    headline: this.state.Propertydetails.headline,
                    owneremail: this.state.Propertydetails.email,
                    zipcode: this.state.Propertydetails.zipcode,

                });
                // this.setState({
                //     type: this.state.Propertydetails[0].type,
                // });
                // var photoList = this.state.photo_uploads.substring(1).split(',');
                // console.log("photoList" + photoList)
                // var imageArr = [];

                // for (let i = 0; i < photoList.length; i++) {

                //     //     var photoList = this.state.propertyDetails.property_id.split(',');
                //     // console.log("photoList"+photoList)

                //     axios.post('http://localhost:3001/propertyresults/photo/' + photoList[i])
                //         .then(response => {
                //             console.log("Imgae Res : ", response);
                //             let imagePreview = 'data:image/jpg;base64, ' + response.data;
                //             imageArr.push(imagePreview)
                //             console.log("imageArr " + imageArr)
                //             // let photoArr = this.state.Propertydetails.map((property, i) => {
                //             //     var newval = property.photo_uploads.substring(1).slice();
                //             //     console.log("newval " + newval)
                //             // })
                //             // let photoArr = this.state.photo_uploads.substring(1);
                //             // // var photoArr = []
                //             // console.log("photoArr " + photoArr)
                //             // photoArr[i] = imagePreview;
                //             this.setState({
                //                 imageView: imageArr
                //             });
                //             console.log('PhotoArr: ', imageArr);
                //             console.log('Photo State: ', this.state.imageView);


                //         })
                //}
            });
    }
    bookChangeHandler() {
        const data = {
            location: this.state.location,
            fromdate: this.state.checkin,
            todate: this.state.checkout,
            guests: this.state.guests,
            email: this.state.currentemail,
            propertyidReceived: this.state.propertyidReceived,
            owneremail: this.state.owneremail,
            headline: this.state.headline,
            state: this.state.state,
            streetaddress: this.state.streetaddress,
            zipcode: this.state.zipcode,
            propertydescription: this.state.propertydescription,


        }
        this.props.bookpropertyMutation({
            variables: {
                location: this.state.location,
                fromdate: this.state.checkin,
                todate: this.state.checkout,
                guests: this.state.guests,
                email: this.state.currentemail,
                property_id: this.state.propertyidReceived,
                owneremail: this.state.owneremail,
                prp_headline: this.state.headline,
                prp_state: this.state.state,
                prp_streetaddress: this.state.streetaddress,
                prp_zipcode: this.state.zipcode,
                propertydescription: this.state.propertydescription,
            },
        }).then(res => {
            console.log("booking data " + JSON.stringify(res));
            if (res.data) {
                swal("Congratulations Your Property is booked", "Have a nice stay!", "success")

            }
        })
        // axios.post('http://localhost:3001/bookproperty', data)
        //     .then(response => {
        //         console.log("Status Code : ", response.status);
        //         if (response.status === 200) {
        //             console.log("response.data " + response.data)
        //             swal("Congratulations Your Property is booked", "Have a nice stay!", "success")

        //             //alert('Congratulations Your Property is booked');
        //         }
        //     })


    }
    onChangeMessage(e) {
        this.setState({
            message: this.state.username + '  : ' + e.target.value
        })
    }
    sendMessageHandler() {
        console.log("this.state.currentemail " + this.state.currentemail)
        var data = {
            owneremail: this.state.owneremail,
            headline: this.state.headline,
            traveleremail: this.state.currentemail,
            location: this.state.location,
            state: this.state.state,
            travelermessage: this.state.message

        }

        this.props.sendMessagefromT(data);
        swal('', "Message Sent", "success")




        // this.props.history.push({
        //     pathname: '/messagebox',
        //     state: {
        //         owneremail: this.state.owneremail,
        //         headline: this.state.headline
        //     }
        // });


    }
    render() {

        let Image = this.state.imageView.map(value => {
            return (
                <div>
                    <img className="property-image" src={value} alt="property-img"></img>
                </div>
            )
        })

        var totalCost = 0;

        if (this.state.price) {


            const startDate = moment(this.state.checkin);
            console.log("startDate" + startDate)

            const timeEnd = moment(this.state.checkout);
            console.log("timeEnd" + timeEnd)

            const diff = timeEnd.diff(startDate);
            console.log("diff" + diff)

            const diffDuration = moment.duration(diff);
            console.log("diffDuration" + diffDuration)

            //console.log(diffDuration._data.days * this.state.propertyDetails.Baserate.substring(1));
            totalCost = (diffDuration._data.days + 1) * this.state.price;
            console.log("totalCost" + totalCost)

        }
        return (
            <div>
                <TravelerNavbar />

                <div className="container-property">
                    <div className="col-md-1">
                        <Carousel showThumbs={false} className="carousel-slide">
                            {Image}
                        </Carousel>
                        <div className="container-inner-property-bottom">
                            <table>
                                <tr >
                                    <td><strong>Type         <br></br> <br></br></strong></td>
                                    <td><strong>Bedroom      <br></br> <br></br></strong></td>
                                    <td><strong>Accomodates <br></br><br></br></strong> </td>
                                    <td><strong>Bathroom    <br></br><br></br></strong> </td>
                                    <td><strong>Min Stays   <br></br><br></br></strong> </td>
                                </tr>
                                <tr >
                                    <td>{this.state.type}  <br></br><br></br></td>
                                    <td>{this.state.bedroom} <br></br><br></br></td>
                                    <td>{this.state.accomodates} <br></br><br></br></td>
                                    <td>{this.state.bathroom} <br></br><br></br></td>
                                    <td>{this.state.min_stays} <br></br><br></br></td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div className="col-md-offset-7">

                        <div className="right-rail">


                            <h1>${this.state.price} per night</h1>
                            {/* <p>{this.state.Propertydetails[0].propertydescription}</p> */}
                            <p>Your dates are <strong>Available!</strong></p>
                            <div className="container-inner-property">
                                <div>Checkin: {this.state.checkin}</div><div>Checkout: {this.state.checkout}</div>
                                <div>Guests: {this.state.guests}</div>
                                <div>
                                    <span className="pull-left">Total:  </span>
                                    <span>${totalCost}</span>
                                </div>
                                <button onClick={this.bookChangeHandler} className="btn btn-primary btn-rounded btn-block">Book</button>
                                <textarea onChange={this.onChangeMessage} name='message' className="inbox-text-prop" placeholder='Send a Message to Owner' />
                                <button onClick={this.sendMessageHandler} className="btn btn-primary btn-rounded btn-block">Send Message</button>
                                <div>For booking assistance, call 888-829-7076<br></br>
                                    Property # 4368385 Unit # 4783218</div>
                            </div>

                        </div>
                    </div>


                    {/* /{details} */}
                </div>
            </div >
        );
    }
}

ViewProperty.propTypes = {
    sendMessagefromT: propTypes.func.isRequired,
    newValue: propTypes.object,
}
const mapStateToProps = state => ({
    newValue: state.home
});

const enhance = compose(
    graphql(bookpropertyMutation, { name: "bookpropertyMutation" }),
    connect(mapStateToProps, { sendMessagefromT })
)

export default enhance(ViewProperty);
// export default compose(graphql(bookpropertyMutation, { name: "bookpropertyMutation" }))(ViewProperty);
// export default connect(mapStateToProps, { sendMessagefromT })(compose(graphql(bookpropertyMutation, { name: "bookpropertyMutation" })));