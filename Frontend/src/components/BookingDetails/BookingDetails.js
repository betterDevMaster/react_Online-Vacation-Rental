import React, { Component } from 'react';
import { connect } from "react-redux";
import propTypes from 'prop-types';
import { getBookingData } from '../../actions/BookingDetailsAction';
import OwnerNavbar from '../Navbar/OwnerNavbar';
import { Nav } from 'react-bootstrap';
import { getOwnerBooking } from '../../queries/queries';
import _ from 'lodash';
import jwtdecode from 'jwt-decode';
import { withApollo } from 'react-apollo';




class BookedProperty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingdetails: [],
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
        console.log("this.state.currentemail" + this.state.currentemail)

        // this.props.getBookingData(this.state.currentemail);
        this.props.client.query({
            query: getOwnerBooking,
            variables: {
                email: this.state.currentemail,
            }
        }).then(res => {
            console.log("BookingDetails" + JSON.stringify(res.data))
            this.setState({
                bookingdetails: res.data.ownerbooking
            })
        })

        // axios.get(`http://127.0.0.1:3001/bookedproperties/${document.cookie}`)
        //     .then((response) => {
        //         if (response.status === 200) {
        //             this.setState({
        //                 bookingdetails: response.data
        //             })
        //             console.log(" response.data" + response.data)

        //         }
        //     }
        //     )
    }
    // componentWillReceiveProps(nextProps) {
    //     console.log("this.props" + JSON.stringify(this.props))
    //     console.log("nextProps.newValue" + nextProps.newValue)
    //     if (!nextProps.newValue.bookingData) {
    //         console.log("No Data found")
    //     }
    //     else {
    //         this.setState({
    //             bookingdetails: nextProps.newValue.bookingData
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
        console.log("this.state.bookingdetails" + this.state.bookingdetails)
        if (event.target.value) {
            let newlyDisplayed = _.filter(this.props.newValue.bookingData, booking => booking.prp_headline.toLowerCase().includes((event.target.value).toLowerCase()))
            console.log("newlyDisplayed " + JSON.stringify(newlyDisplayed))

            this.setState({
                bookingdetails: newlyDisplayed
                //? this.state.bookingdetails : newlyDisplayed
            })
        }
        else {
            console.log("bookingdetails " + JSON.stringify(this.state.bookingdetails))
            this.setState({
                bookingdetails: this.props.newValue.bookingData
                //? this.state.bookingdetails : newlyDisplayed
            })

        }
    }
    onInputDateChange(event) {
        if (event.target.value) {
            let newlyDisplayed = _.filter(this.props.newValue.bookingData, booking => booking.fromdate.includes(event.target.value))
            this.setState({
                bookingdetails: newlyDisplayed
                //? this.state.bookingdetails : newlyDisplayed
            })
        }
        else {
            console.log("bookingdetails " + JSON.stringify(this.state.bookingdetails))
            this.setState({
                bookingdetails: this.props.newValue.bookingData
                //? this.state.bookingdetails : newlyDisplayed
            })
        }
    }

    render() {
        const { current, itemsPerPage } = this.state;
        const indexOfLastPage = current * itemsPerPage;
        const indexOfFirstPage = indexOfLastPage - itemsPerPage;
        const currentListTorun = this.state.bookingdetails.slice(indexOfFirstPage, indexOfLastPage);
        console.log("Number of properties : " + this.state.bookingdetails.length);

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.bookingdetails.length / itemsPerPage); i++) {
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
        let details = currentListTorun.map((booking, i) => {
            return (
                <div className="jumbotron vertical-center">
                    <div className="container">
                        <table>
                            <th><font color='blue'>Property:    {booking.prp_headline}</font></th>
                            <tr><strong>City:    {booking.location}</strong></tr>
                            <tr>Property ID:    {booking.property_id}</tr>
                            <tr>Property State:    {booking.prp_state}</tr>
                            <tr>Property Description:    {booking.propertydescription}</tr>
                            <br></br>
                            <br></br>
                            <tr>
                                <tr>Booking From Date:    {booking.fromdate.substring(0, 10)}</tr>
                                <tr>Booking To Date:    {booking.todate.substring(0, 10)}</tr>
                                <tr>Number of Guests:    {booking.guests}</tr>
                            </tr>

                        </table>
                    </div>
                </div>
            )
        })

        return (<div>
            <OwnerNavbar />
            <div className="main-white-bg">

                <h3>Booking Details</h3>
                <Nav>
                    <input type='text' className='input-button' onChange={this.onInputChange} name='search' placeholder='Filter Properties' ></input>
                    <input type='date' className='input-button' onChange={this.onInputDateChange} name='fromdate' ></input>
                    <h4 className='total-res'> Total Results Found: {this.state.bookingdetails.length}</h4>

                    {/* <input type='date' className='input-button' onChange={this.onInputDateChange} name='todate' ></input> */}
                </Nav>
                <br></br>
                <br></br>

                <div>{details}</div>
            </div>
            <div className="page">
                {showPageNumbers1}
            </div>
        </div>);
    }
}
BookedProperty.propTypes = {
    getBookingData: propTypes.func.isRequired,
    newValue: propTypes.object
}

const mapStateToProps = state => ({
    newValue: state.booking
});

export default connect(mapStateToProps, { getBookingData })(withApollo(BookedProperty));