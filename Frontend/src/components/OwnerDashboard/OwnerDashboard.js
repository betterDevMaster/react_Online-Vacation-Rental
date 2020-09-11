import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from "react-redux";
import propTypes from 'prop-types';
import { getPropertyData } from '../../actions/OwnerDashboardAction';
import OwnerNavbar from '../Navbar/OwnerNavbar';
import jwtdecode from 'jwt-decode';

var AUTH_TOKEN = localStorage.getItem('token')
axios.defaults.headers.common['authorization'] = AUTH_TOKEN;




var swal = require('sweetalert');



class OwnerDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: [],
            country: "",
            streetaddress: "",
            building: "",
            city: "",
            state: "",
            zipcode: "",
            headline: "",
            type: "",
            propertydescription: "",
            bedroom: "",
            accomodates: "",
            bathroom: '',
            available_from: "",
            available_to: "",
            price: "",
            min_stays: "",
            description: "",
            selectedFile: [],
            imageView: "",
            property_id: "",
            redirectVar: "",
            token: false,
            currentemail: '',
            username: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onphotoChange = this.onphotoChange.bind(this);
        // this.onSubmitChangeHandler = this.onSubmitChangeHandler.bind(this);


    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value

        })
        // console.log("e.target.value" + e.target.value)
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
        console.log("this.state.currentemail" + this.state.currentemail)
        console.log("this.props.history.location.pathname.substring(16)" + this.props.history.location.pathname.substring(16))

        var Values = {
            email: this.state.currentemail,
            property_id: this.props.history.location.pathname.substring(16)
        }
        this.props.getPropertyData(Values);
    }
    // axios.defaults.withCredentials = true;
    // axios.post(`http://localhost:3001/ownerdashboard`, {
    //     params: {
    //         email: document.cookie,
    //         property_id: this.props.history.location.pathname.substring(16)
    //     }
    // })
    //     .then((response) => {
    //         console.log("response.status" + response.status)
    //         if (response.statusCode === 400 && response.data === "Invalid Token") {
    //             console.log("Forbiden")
    //             this.setState({
    //                 redirectVar: <Redirect to="/login" />
    //             })
    //         }
    //         if (response.statusCode === 200 && response.data === "Invalid Token") {
    //             console.log("Unauthorized Login Login First")
    //             this.setState({
    //                 redirectVar: <Redirect to="/login" />
    //             })
    //         }
    //         if (response.statusCode === 401) {
    //             console.log("Unauthorized Login Login First")
    //             this.setState({
    //                 redirectVar: <Redirect to="/login" />
    //             })
    //         }
    //         let location = Object.assign({}, this.state.location);
    //         location = response.data;
    //         console.log(" INSERT response.data" + JSON.stringify(response))

    //         console.log(" INSERT response.data" + response.data)
    componentWillReceiveProps(nextProps) {
        console.log("nextProps.newValue.propertyData +" + JSON.stringify(nextProps))

        if (!nextProps.newValue) {
            console.log("No Data found")
        }
        else {
            console.log(JSON.stringify(nextProps))
            console.log("nextProps.newValue.propertyData +" + JSON.stringify(nextProps))
            this.setState({
                location: nextProps.newValue
            });
            console.log("location" + JSON.stringify(nextProps.newValue))
            console.log("location.country " + nextProps.newValue.email)
            console.log("Property ID " + nextProps.newValue._id)
            this.setState({
                country: nextProps.newValue.country,
                streetaddress: nextProps.newValue.streetaddress,
                building: nextProps.newValue.building,
                property_id: nextProps.newValue._id,
                city: nextProps.newValue.city,
                zipcode: nextProps.newValue.zipcode,
                state: nextProps.newValue.state,
                headline: nextProps.newValue.headline,
                type: nextProps.newValue.type,
                propertydescription: nextProps.newValue.propertydescription,
                bedroom: nextProps.newValue.bedroom,
                accomodates: nextProps.newValue.accomodates,
                bathroom: nextProps.newValue.bathroom,
                available_from: nextProps.newValue.available_from,
                available_to: nextProps.newValue.available_to,
                price: nextProps.newValue.price,
                min_stays: nextProps.newValue.min_stays
            });
            // });
            // axios.interceptors.response.use(undefined, function (error) {
            //     console.log("Unauthorized Login Login First" + error)
            //     this.setState({
            //         redirectVar: <Redirect to="/login" />
            //     })
            // });
            // axios.interceptors.response.use((response) => {
            //     return response;
            // }, function (error) {
            //     // Do something with response error
            //     if (error.response.status === 401) {
            //         console.log('unauthorized, logging out ...');
            //         // auth.logout();
            //         // router.replace('/auth/login');
            //     }
            //     return Promise.reject(error.response);
            // });
        }
    }
    //save
    saveChangeHandler = (event) => {
        //prevent page from refresh
        event.preventDefault();
        const data = {
            email: this.state.currentemail,
            location: this.state.location,
            country: this.state.country,
            streetaddress: this.state.streetaddress,
            building: this.state.building,
            city: this.state.city,
            state: this.state.state,
            zipcode: this.state.zipcode,
            headline: this.state.headline,
            type: this.state.type,
            propertydescription: this.state.propertydescription,
            bedroom: this.state.bedroom,
            accomodates: this.state.accomodates,
            bathroom: this.state.bathroom,
            available_from: this.state.available_from,
            available_to: this.state.available_to,
            price: this.state.price,
            min_stays: this.state.min_stays,
            property_id: this.state.property_id

        }
        console.log("this.state.property_id TERNARY" + (this.state.property_id ? this.props.history.location.pathname.substring(16) : this.state.property_id))
        console.log('this.props.history.location.pathname.substring(16)' + this.props.history.location.pathname.substring(16))
        console.log("this.state.property_id TERNARY" + (this.state.property_id ? this.props.history.location.pathname.substring(16) : this.state.property_id))
        console.log("this.state.property_id " + this.state.property_id)
        console.log("this.state.location " + this.state.location)
        console.log("this.state.location " + this.state.country)

        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/ownerdashboard/location', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("response.data " + response.data)
                    let location = Object.assign({}, this.state.location);
                    location = response.data;
                    this.setState({ location });
                    console.log("location data in response " + this.state.location)
                    console.log("location data in response " + this.state.location.country)
                } else {
                    console.log("Error while getting data")
                }
            });
    }

    //Photo Code
    onphotoChange = (e) => {
        e.preventDefault();
        for (var i = 0; i < e.target.files.length; i++) {
            if (e.target.name === 'selectedFile') {
                console.log("e.target.files.length" + e.target.files.length)
                console.log("e.target.files.files[i]" + e.target.files[i])
                var selectedFile = e.target.files[i]
                console.log("selectedFile" + this.state.selectedFile)
                console.log(" Only selectedFile" + selectedFile)
            } else {
                this.setState({ [e.target.name]: e.target.value });
            }
            console.log("{selectedFile}" + JSON.stringify(this.state.selectedFile))
            let formData = new FormData();
            formData.append('description', this.state.description);
            formData.append('selectedFile', selectedFile);
            axios.post(`http://localhost:3001/photo`, formData)
                .then((result) => {
                    // access results...
                    if (result.status === 200) {
                        console.log("result" + result)
                        var property_id = this.state.property_id
                    }

                    console.log("property_id" + property_id)
                    return axios.post(`http://localhost:3001/upload/${property_id}`)
                        .then((result) => {
                            // access results...
                            if (result.status === 200) {
                                console.log("Results" + JSON.stringify(result))
                                swal("Upload Successful", "Success")
                            }

                        });

                });
        }
    }




    render() {


        return (<div>
            <OwnerNavbar />
            <div class="col-lg-3">
                <ul className="nav nav-tabs tabs-left nav-stacked" role="tablist">
                    <li class="nav-item active"><a class="nav-link" data-toggle="tab" href="#welcome">Welcome</a></li>
                    <li class="nav-item "><a class="nav-link" data-toggle="tab" href="#location">Location</a></li>
                    <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#details">Details</a></li>
                    <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#photos" >Photos</a></li>
                    <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#pricing">Pricing</a>
                        <ul class="sublist" role="tablist">
                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#availability" >Availability</a></li>
                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#rentalrates" >Rental Rates</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="col-lg-9">
                <div className="tab-content">
                    <div id="welcome" className="tab-pane active">
                        <h2> Welcome! Verify the location of your rental</h2>
                        <p>Just 5 steps remaining.</p>
                        <button className="btn btn-primary"><a class="nav-link" data-toggle="tab" href="#location"><font color="white">Continue</font></a></button>
                    </div>
                    <div id="location" className="tab-pane">
                        <div className="container">
                            <div className="main-div-owner">
                                <h2> Enter the location of your rental</h2>
                                <div className="form-group">
                                    <input onChange={this.onChange} type="text" className="form-control" name="country" placeholder="Country" value={this.state.country} required />
                                </div>
                                <div className="form-group">
                                    <input onChange={this.onChange} type="text" className="form-control" name="streetaddress" placeholder="Street Address" value={this.state.streetaddress} required />
                                </div>
                                <div className="form-group">
                                    <input onChange={this.onChange} type="text" className="form-control" name="building" placeholder="Unit,Suite,Building,Etc." value={this.state.building} required />
                                </div>
                                <div className="form-group">
                                    <input onChange={this.onChange} type="text" className="form-control" name="city" placeholder="City" value={this.state.city} required />
                                </div>
                                <div className="form-group">
                                    <input onChange={this.onChange} type="text" className="form-control" name="state" placeholder="State" value={this.state.state} required />
                                </div>
                                <div className="form-group">
                                    <input onChange={this.onChange} type="text" className="form-control" name="zipcode" placeholder="Zip Code" value={this.state.zipcode} required />
                                </div>
                                <button className="btn btn-primary">Cancel</button>
                                <span>
                                </span>
                                <button onClick={this.saveChangeHandler} className="btn btn-primary"><a class="nav-link" data-toggle="tab" href="#details"><font color="white">Save</font></a></button>
                            </div>
                        </div>
                    </div>
                    <div id="details" className="tab-pane">
                        <div className="container">
                            <div className="main-div-owner">
                                <h2><strong>Describe your property</strong></h2>
                                <hr></hr>
                                <p>Start out with a descriptive headline and a detailed summary of your property.</p>
                                <div className="form-group">
                                    <input onChange={this.onChange} type="text" className="form-control" name="headline" placeholder="Headline" value={this.state.headline} />
                                </div>
                                <div className="form-group">
                                    <textarea onChange={this.onChange} type="text" className="form-control" name="propertydescription" placeholder="Property Description" value={this.state.propertydescription} />
                                </div>
                                <div className="form-group">
                                    <select onChange={this.onChange} name='type'>
                                        <option value="apartment">Apartment</option>
                                        <option value="barn">Barn</option>
                                        <option value="bedandbreakfast">Bed and Breakfast</option>
                                        <option value="boat">Boat</option>
                                        <option value="bungalow">Bungalow</option>
                                        <option value="cabin">Cabin</option>
                                        <option value="campground">Campground</option>
                                        <option value="castle">Castle</option>
                                        <option value="chalet">Chalet</option>
                                        <option value="chateu">Chateu</option>
                                        <option value="condo">Condo</option>
                                        <option value="corporateapt">Corporate Apartment</option>
                                        <option value="cottage">Cottage</option>
                                        <option value="estate">Estate</option>
                                        <option value="farmhouse">Farmhouse</option>
                                        <option value="guesthouse">Guest House</option>
                                        <option value="hostel">Hostel</option>
                                        <option value="hotel">Hotel</option>
                                        <option value="hotelsuites">Hotel Suites</option>
                                        <option value="house">House</option>
                                        <option value="lodge">Lodge</option>
                                        <option value="mill">Mill</option>
                                        <option value="mobilehome">Mobile Home</option>
                                        <option value="recreationalvehicle">Recreational Vechicle</option>
                                        <option value="resort">Resort</option>
                                        <option value="studio">Studio</option>
                                        <option value="tower">Tower</option>
                                        <option value="townhome">Town home</option>
                                        <option value="villa">Villa</option>
                                        <option value="yacht">Yacht</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <input onChange={this.onChange} type="number" className="form-control" name="bedroom" placeholder="Bedroom" value={this.state.bedroom} />
                                </div>
                                <div className="form-group">
                                    <input onChange={this.onChange} type="number" className="form-control" name="accomodates" placeholder="Accomodates" value={this.state.accomodates} />
                                </div>
                                <div className="form-group">
                                    <input onChange={this.onChange} type="number" className="form-control" name="bathroom" placeholder="Bathroom" value={this.state.bathroom} />
                                </div>
                                <hr></hr>
                                <button onClick={this.backChangeHandler} className="btn btn-primary"><a class="nav-link" data-toggle="tab" href="#location"><font color="white">Back</font></a></button>
                                <span>
                                </span>
                                <button onClick={this.saveChangeHandler} className="btn btn-primary"><a class="nav-link" data-toggle="tab" href="#photos"><font color="white">Next</font></a></button>
                            </div>
                        </div>
                    </div>
                    <div id="photos" class="tab-pane" >
                        <div className="container">
                            <div className='main-div-owner'>


                                <div>
                                    {/* <input
                                        type="text"
                                        name="description"
                                        onChange={this.onphotoChange}
                                        multiple
                                    /> */}
                                    <label for="propertyimg" name="description" onChange={this.onPhotoChange} className="btn btn-success">SELECT PHOTOS TO UPLOAD</label>

                                    <input
                                        type="file" id='propertyimg' className="hidethis"
                                        name="selectedFile"
                                        onChange={this.onphotoChange}
                                        multiple />
                                    {/* <div className="profilepicuploadbutton">
                                    <label for="uploadpic" name="description" onChange={this.onPhotoChange} className="btn btn-success">SELECT PHOTO TO UPLOAD</label>
                                    <input type="file" id="uploadpic" className="hidethis" name="selectedFile" onChange={this.onPhotoChange} />
                                </div> */}
                                    {/* <button onClick={this.onSubmitChangeHandler}>Submit</button> */}
                                    {/* <div>
                                        <img alt='profile-img' src={this.state.imageView} />
                                    </div> */}
                                    <div>
                                        <button className="btn btn-primary"><a class="nav-link" data-toggle="tab" href="#details"><font color="white">Back</font></a></button>

                                        <button className="btn btn-primary"><a class="nav-link" data-toggle="tab" href="#availability"><font color="white">Next</font></a></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div id="pricing" className='main-div-owner'>
                        <div class="col-lg-3 offset-5"></div>
                        <div className="tab-content"> */}
                    {/* <div id="availability" className="tab-pane"> */}
                    <div id="availability" className="tab-pane" >
                        <div className="container">
                            <div className='main-div-owner'>
                                <h2>Enter Available Dates</h2>
                                <div className="form-group">
                                    <input onChange={this.onChange} type="date" className="form-control" name="available_from" placeholder="Available From" value={this.state.available_from} />
                                </div>
                                <div className="form-group">
                                    <input onChange={this.onChange} type="date" className="form-control" name="available_to" placeholder="Available To" value={this.state.available_to} />
                                </div>
                                <hr></hr>
                                <button className="btn btn-primary"><a class="nav-link" data-toggle="tab" href="#photos"><font color="white">Back</font></a></button>
                                <span>
                                </span>
                                <button onClick={this.saveChangeHandler} className="btn btn-primary"><a class="nav-link" data-toggle="tab" href="#rentalrates"><font color="white">Next</font></a></button>
                            </div>
                        </div>
                    </div>

                    <div id="rentalrates" className="tab-pane">
                        <div className="container">
                            <div className='main-div-owner'>
                                <h2>How much do you want to charge?</h2>
                                <hr></hr>
                                <p>We recommend starting with a low price to get a few bookings and earn some initial guest reviews. You can update your rates at any time.</p>
                                <div className="form-group">
                                    <h3>Nightly Base Rate</h3><span></span>
                                    <input onChange={this.onChange} type="number" className="form-control" name="price" placeholder="Price" value={this.state.price} />
                                </div>
                                <div className="form-group">
                                    <h3>Minimum stay</h3><span></span>
                                    <input onChange={this.onChange} type="number" className="form-control" name="min_stays" placeholder="Minimum stay" value={this.state.min_stays} />
                                </div>
                                <hr></hr>
                                <button className="btn btn-primary"><a class="nav-link" data-toggle="tab" href="#availability"><font color="white">Back</font></a></button>
                                <span>
                                </span>
                                <button onClick={this.saveChangeHandler} className="btn btn-primary"><Link to='/propertylisting'><font color="white">Save</font></Link></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}
OwnerDashboard.propTypes = {
    getPropertyData: propTypes.func.isRequired,
    newValue: propTypes.string
}

const mapStateToProps = state => ({
    newValue: state.ownerdashboard.propertyData
});

export default connect(mapStateToProps, { getPropertyData })(OwnerDashboard);
