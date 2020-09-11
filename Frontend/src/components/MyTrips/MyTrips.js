import React, { Component } from 'react';
import { connect } from "react-redux";
import propTypes from 'prop-types';
import { getTripsData } from '../../actions/MyTripsAction';
import TravelerNavbar from '../Navbar/Navbar2';
import { Navbar, Nav } from 'react-bootstrap';
import _ from 'lodash';
import jwtdecode from 'jwt-decode';
import { withApollo } from 'react-apollo';
import { getTravelerBooking } from '../../queries/queries';






class MyTrips extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tripdetails: [],
            token: false,
            currentemail: '',
            username: '',
            activePage: 1,
            current: 1,
            itemsPerPage: 5,
        }
        this.onInputChange = this.onInputChange.bind(this)
        this.onInputDateChange = this.onInputDateChange.bind(this)
        this.clickHandler = this.clickHandler.bind(this);
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
    clickHandler(e) {
        this.setState({
            current: Number(e.target.id)
        });
    }

    componentDidMount() {
        console.log("currentemail" + this.state.currentemail)

        // this.props.getTripsData(this.state.currentemail);
        this.props.client.query({
            query: getTravelerBooking,
            variables: {
                email: this.state.currentemail,
            }
        }).then(res => {
            console.log("BookingDetails" + JSON.stringify(res.data))
            this.setState({
                tripdetails: res.data.travelerbooking
            })
        })

        // axios.get(`http://localhost:3001/bookedtrips/${document.cookie}`)
        //     .then((response) => {
        //         console.log("response.data" + response)
        //         console.log("response.data" + JSON.stringify(response))

        //         if (response.status === 200) {
        //             this.setState({
        //                 tripdetails: response.data,

        //             });
        //             // console.log("tripdetails" + this.state.tripdetails)
        //             // console.log("tripdetails" + this.state.tripdetails[0].location)
        //             // console.log("tripdetails" + this.state.tripdetails[0].property_id)


        //         }
        //     })
        console.log("tripdetails" + this.state.tripdetails)
        console.log("tripdetails" + this.state.tripdetails.location)
        console.log("tripdetails" + this.state.tripdetails.property_id)
    }
    // componentWillReceiveProps(nextProps) {
    //     if (!nextProps.newValue.tripsData) {
    //         console.log("No Data found")
    //     }
    //     else {
    //         this.setState({
    //             tripdetails: nextProps.newValue.tripsData
    //         })
    //         console.log("Login Successful")

    //     }
    // }
    onInputChange(event) {
        // this.setState({
        //     [event.target.name]: event.target.value
        // })

        // }
        // searchChangeHandler() {
        console.log('searchChangeHandler')
        console.log("this.state.tripdetails" + this.state.tripdetails)
        if (event.target.value) {
            let newlyDisplayed = _.filter(this.props.newValue.tripsData, booking => booking.prp_headline.toLowerCase().includes((event.target.value).toLowerCase()))
            console.log("newlyDisplayed " + JSON.stringify(newlyDisplayed))

            this.setState({
                tripdetails: newlyDisplayed
                //? this.state.tripdetails : newlyDisplayed
            })
        }
        else {
            console.log("tripdetails " + JSON.stringify(this.state.tripdetails))
            this.setState({
                tripdetails: this.props.newValue.tripsData
                //? this.state.tripdetails : newlyDisplayed
            })

        }
    }
    onInputDateChange(event) {
        if (event.target.value) {
            let newlyDisplayed = _.filter(this.props.newValue.tripsData, booking => (booking.fromdate <= event.target.value))
            this.setState({
                tripdetails: newlyDisplayed
                //? this.state.tripdetails : newlyDisplayed
            })
        }
        else {
            console.log("tripdetails " + JSON.stringify(this.state.tripdetails))
            this.setState({
                tripdetails: this.props.newValue.tripsData
                //? this.state.bookingdetails : newlyDisplayed
            })
        }
    }
    render() {
        const { current, itemsPerPage } = this.state;
        const indexOfLastPage = current * itemsPerPage;
        const indexOfFirstPage = indexOfLastPage - itemsPerPage;
        const currentListTorun = this.state.tripdetails.slice(indexOfFirstPage, indexOfLastPage);
        console.log("Number of properties : " + this.state.tripdetails.length);

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.props.newValue.tripsData.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }

        const showPageNumbers1 = pageNumbers.map(number => {
            return (
                <li class="page-item active"
                    key={number}
                    id={number}
                    onClick={this.clickHandler}
                    className="nums"
                >
                    {number}
                </li>
            );
        });

        let details = currentListTorun.map((trip, i) => {
            return (
                <div className="jumbotron vertical-center">
                    <div className="container">
                        <table>
                            <th><font color='blue'>Trips:    {trip.prp_headline}</font></th>
                            <tr><strong>City:    {trip.location}</strong></tr>
                            <tr>Street Address:    {trip.prp_streetaddress}</tr>
                            <tr>Property Description:    {trip.propertydescription}</tr>
                            <br></br>
                            <br></br>
                            <tr>
                                <td>Your Booking ID: {trip.id}</td>
                            </tr>
                            <tr>
                                <tr>Booking From Date:    {trip.fromdate.substring(0, 10)}</tr>
                                <tr>Booking To Date:    {trip.todate.substring(0, 10)}</tr>
                                <tr>Number of Guests:    {trip.guests}</tr>
                            </tr>
                        </table>
                    </div>
                </div>
            )
        })

        return (<div>
            <TravelerNavbar />
            <div className="main-white-bg">
                <h3>Your Previous Trip Details</h3>
                <Nav>
                    <input type='text' className='input-button' onChange={this.onInputChange} name='search' placeholder='Filter Properties' ></input>
                    <input type='date' className='input-button' onChange={this.onInputDateChange} name='fromdate' ></input>
                    <h4 className='total-res'> Total Results Found: {this.state.tripdetails.length}</h4>
                </Nav>
                <br>
                </br>
                <br>
                </br>
                <div>{details}</div>
            </div>
            <div className="page">
                {showPageNumbers1}
            </div>
        </div>);
    }
}
MyTrips.propTypes = {
    getTripsData: propTypes.func.isRequired,
    newValue: propTypes.object.isRequired
}

const mapStateToProps = state => ({
    newValue: state.trips
});

export default connect(mapStateToProps, { getTripsData })(withApollo(MyTrips));