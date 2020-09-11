import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import { connect } from "react-redux";
import propTypes from 'prop-types';
import 'bootstrap/dist/js/bootstrap.min.js';
import { getSearchData, userEnteredData } from '../../actions/HomeAction';
import jwtdecode from 'jwt-decode';
import { getSearchQuery } from '../../queries/queries';
import { withApollo } from 'react-apollo';
var swal = require('sweetalert');
var checkDateval = false;
var checkDepartDateval = false;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "",
            arrivaldate: "",
            departdate: "",
            guests: "",
            results: [],
            hits: '',
            token: false,
            currentemail: '',
            username: ''
        }
        this.handleOnClickTravelerLogin = this.handleOnClickTravelerLogin.bind(this);
        this.handleOnClickOwnerLogin = this.handleOnClickOwnerLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.searchChangeHandler = this.searchChangeHandler.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeArrivalDate = this.onChangeArrivalDate.bind(this);
        this.onChangeDepartDate = this.onChangeDepartDate.bind(this);
        this.checkDate = this.checkDate.bind(this);
        this.checkDepartDate = this.checkDepartDate.bind(this);




    }
    componentDidMount() {
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


    }
    //handle logout to destroy the token
    handleLogout = () => {
        // cookie.remove('cookie', { path: '/' })
        localStorage.removeItem("token")

    }
    onChangeArrivalDate(e) {
        this.checkDate(e.target.value)
        if (checkDateval) {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
        else {
            this.setState({
                [e.target.name]: ''
            })
        }

    }
    onChangeDepartDate(e) {
        this.checkDate(e.target.value)
        this.checkDepartDate(e.target.value)

        if (checkDateval && checkDepartDateval) {

            this.setState({
                [e.target.name]: e.target.value
            })
        }
        else {
            this.setState({
                [e.target.name]: ''
            })
        }
    }
    checkDate = (date) => {
        // var selectedText = document.getElementById('datepicker').value;
        var selectedDate = new Date(date);
        var now = new Date();
        if (selectedDate < now) {
            swal("", "Date must be in the future")
            //alert("Date must be in the future");
            checkDateval = false
        }
        else {
            checkDateval = true
        }
    }
    checkDepartDate = (date) => {
        if (this.state.arrivaldate > date) {
            swal("", "Departure Date must be Greater that arrival date")

            //alert("Departure Date must be Greater that arrival date");
            checkDepartDateval = false
        }
        else {
            checkDepartDateval = true
        }

    }
    onChange(e) {
        // e => this.props.setData({ [e.target.name]: e.target.value })
        this.setState({
            [e.target.name]: e.target.value

        })
        // console.log("e.target.value" + e.target.value)
    }

    handleOnClickTravelerLogin() {
        this.props.history.push("/login");
    }
    handleOnClickOwnerLogin() {
        this.props.history.push("/ownerlogin");
    }


    searchChangeHandler() {
        if (!this.state.location || !this.state.arrivaldate || !this.state.departdate || !this.state.guests) {
            swal("", "All fields are mandatory")
        }
        else {
            const data = {
                //email: document.cookie,
                location: this.state.location,
                arrivaldate: this.state.arrivaldate,
                departdate: this.state.departdate,
                guests: this.state.guests,
            }
            console.log("location +" + this.state.location)
            console.log("arrivaldate +" + this.state.arrivaldate)
            console.log("departdate +" + this.state.departdate)
            console.log("guests +" + this.state.guests)
            //Call Action Here
            this.props.client.query({
                query: getSearchQuery,
                variables: {
                    location: this.state.location,
                    arrivaldate: this.state.arrivaldate,
                    departdate: this.state.departdate,
                    guests: this.state.guests,

                },
            }).then(res => {
                if (res.data.property) {
                    this.props.getSearchData(res);
                    if (this.props.history.length > 0) {
                        this.props.history.push({
                            pathname: "/propertyresults"
                        })
                    }
                }
                else {
                    swal("Could not find Properties with your search criteria", "Try Searching for other properties")
                }
                console.log("PropertySearch " + JSON.stringify(res));
            })

            this.props.userEnteredData(data);
        }

    }

    // componentWillReceiveProps(nextProps) {
    //     console.log("nextProps " + nextProps)
    //     console.log("nextProps " + JSON.stringify(nextProps))
    //     console.log("newValue,searchData " + nextProps.newValue.searchData)
    //     console.log("this.props.newValue.length" + nextProps.history.length)

    //     if (!nextProps.newValue.searchData) {
    //         console.log("No Data found")
    //     }
    //     else {
    //         console.log("Login Successful")
    //         if (this.props.history.length > 0) {
    //             this.props.history.push({
    //                 pathname: "/propertyresults"
    //                 // ,state: { nextProps: nextProps }

    //             })
    //         }
    //     }

    // }



    // axios.post('http://127.0.0.1:3001/searchproperty', data)
    //     .then((response) => {
    //         //let data = {
    //         //results: response.data,
    //         //}
    //         console.log("response.data" + JSON.stringify(response.data))
    //         console.log("results 1++++" + this.state.results)
    //         const newval = JSON.stringify(response.data)
    //         const userdata = JSON.stringify(data)
    //         if (window.localStorage) {
    //             sessionStorage.setItem("newval", newval);
    //             sessionStorage.setItem("guestsentry", userdata);
    //         }
    //         else {
    //             console.log("Local Storage not supported")
    //         }
    //         var getval = sessionStorage.getItem("newval")
    //         console.log("locacal storage" + getval);
    //         this.setState({
    //             //data
    //             results: response.data
    //         })

    //     })
    //}

    render() {
        const isEnabled = this.state.token
        //if Cookie is set render Logout Button
        let navLogin = null;
        if (this.state.token) {
            console.log("Able to read token");
            navLogin = (
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#"></a>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="nav navbar-nav navbar-right">
                            <li className="nav-item active">
                                <Link to="/mytrips" className="nav-link-home">Tripboards <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link-home" href="#">Help <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link-home dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.state.username}
                                </a>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><Link to="/profile" className="dropdown-item">My Profile</Link></li>
                                    <li><Link to="/messagebox" className="dropdown-item">Inbox</Link></li>
                                    <li><a href="/home" onClick={this.handleLogout} className="dropdown-item">Logout</a></li>

                                </div></li>
                            <li className="nav-item">
                                <Link to="/ownerlogin" className="btn btn-default" >List your property</Link>
                            </li>
                            <li className="nav-item">
                                <a className="site-header-birdhouse" title="Learn more"><img alt="HomeAway birdhouse" className="site-header-birdhouse__image" role="presentation" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/birdhouse-bceheader-white.svg" /></a>
                            </li>
                        </ul>
                    </div>
                </nav>

            )
        }
        else {
            console.log(" Not Able to read token")
            navLogin = (


                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#"></a>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="nav navbar-nav navbar-right">
                            <li className="nav-item active">
                                <Link to='/login' className="nav-link-home">Tripboards <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link-home" href="#">Help <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link-home dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Login
                            </a>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><Link to="/login" className="dropdown-item" >Traveler Login</Link></li><br></br>
                                    <li><Link to="/ownerlogin" className="dropdown-item" >Owner Login</Link></li>
                                </div></li>
                            <li className="nav-item">
                                <Link to="/ownersignup" className="btn btn-default">List your property</Link>
                            </li>
                            <li className="nav-item">
                                <a className="site-header-birdhouse" title="Learn more"><img alt="HomeAway birdhouse" className="site-header-birdhouse__image" role="presentation" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/birdhouse-bceheader-white.svg" /></a>
                            </li>
                        </ul>
                    </div>
                </nav>
                //         <Nav pullRight>
                //             <div className='dropdown'>
                //                 <button className="btn-nav dropdown-toggle btn-lg"
                //                     type="button" id="dropdownMenu1" data-toggle="dropdown">
                //                     {this.state.username} <span className="caret"></span>
                //                 </button>
                //                 <ul className="dropdown-menu">
                //                     <li ><a href="/mytrips" >My Trips</a></li>
                //                     <li ><Link to="/profile" >Profile</Link></li>
                //                     <li ><Link to="/messagebox">Inbox</Link></li>
                //                     <li className="divider"></li>
                //                     <li><a href="/home" onClick={this.handleLogout}>Logout</a></li>
                //                 </ul>
                //             </div>
                //         </Nav>
                //     );
                // } else {
                //     //Else display login button
                //     console.log("Not Able to read token");
                //     navLogin = (
                //         <div>
                //             <Nav pullRight>
                //                 <div className='dropdown'>
                //                     <button className="btn-nav dropdown-toggle btn-lg"
                //                         type="button" id="dropdownMenu1" data-toggle="dropdown">
                //                         Login <span className="caret"></span>
                //                     </button>
                //                     <ul className="dropdown-menu">
                //                         <li ><Link to="/login" >Traveler Login</Link>
                //                             <p className="divider"></p>
                //                         </li>
                //                         <li><Link to="/ownerlogin">Owner Login</Link></li>
                //                     </ul>
                //                 </div>
                //             </Nav>
                //             {/* <Nav pullRight>
                //                 <img alt="homeaway birdhouse" src="https://csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/birdhouse-bceheader-white.svg">
                //                 </img>
                //             </Nav> */}
                //         </div>

            )
        }


        return (
            < body alt="background" background="//csvcus.homeaway.com/rsrcs/stab-cms-resources/0.10.30/images/homepage/jumbotron/ptaHpNextHeroImage/large.jpg" >
                <div className="bg-img">
                    <nav className="navbar">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <img alt="HomeAway logo" className="site-header-logo__img img-responsive" role="presentation" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/logo-bceheader-white.svg">
                                </img>
                            </div>
                            {navLogin}
                        </div>
                    </nav>


                    <div className='containernew'>
                        <h1 className="info">Book beach houses,cabins, condos and more,worldwide</h1>
                        <div className='input-group' >
                            <input type='text' className='input-button' onChange={this.onChange} name='location' value={this.state.location} placeholder='Where do you want to go?' required></input>
                            <input type='date' className='input-button' onChange={this.onChangeArrivalDate} name='arrivaldate' value={this.state.arrivaldate} placeholder='Arrive' required></input>
                            <input type='date' className='input-button' onChange={this.onChangeDepartDate} name='departdate' value={this.state.departdate} placeholder='Depart' required></input>
                            <input type='number' className='input-button' onChange={this.onChange} name='guests' value={this.state.guests} placeholder='Guests' required></input>
                            <button disabled={!isEnabled}
                                onClick={this.searchChangeHandler} className='input-group-btn' className="btn btn-primary" >Search</button>
                        </div>
                        <div className="flex-container">
                            <div><p><strong>Your whole vacation starts here.</strong></p>
                                <p>Choose a rental from the world's best selection.</p>
                            </div>
                            <div>
                                <p><strong>Book and stay with confidence.</strong></p>
                                <a href="https://www.homeaway.com/info/ha-guarantee/travel-with-confidence">Secure payments, peace of mind</a>
                            </div>
                            <div>
                                <p><strong>Your vacation your way.</strong></p>
                                <p>More space, more privacy, no compromises.</p>
                            </div>
                        </div>
                    </div>

                </div >

            </body >
        );
    }
}

Home.propTypes = {
    getSearchData: propTypes.func.isRequired,
    newValue: propTypes.object.isRequired
}

const mapStateToProps = state => ({
    newValue: state.home
});
//export default(Home);

export default connect(mapStateToProps, { getSearchData, userEnteredData })(withApollo(Home));