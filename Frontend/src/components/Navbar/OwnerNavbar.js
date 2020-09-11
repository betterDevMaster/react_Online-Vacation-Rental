import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Redirect } from 'react-router';
import jwtdecode from 'jwt-decode';

class OwnerNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addproperty: "",
            token: false,
            currentemail: '',
            username: ''
        }
        this.handleLogout = this.handleLogout.bind(this);

    }
    componentDidMount() {
        console.log("localStorage.getItem" + localStorage.getItem("token"))
        if (localStorage.getItem("token")) {
            var decoded = jwtdecode(localStorage.getItem("token"));
            console.log("decoded  " + decoded)
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
        localStorage.removeItem('token');

    }
    render() {

        //if not logged in go to login page
        let redirectVar = null;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/ownerlogin" />
        }
        return (<div>
            {redirectVar}
            <Navbar>
                <Link to="/home">
                    <img alt="profile" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg"></img>
                </Link>
                <Nav pullRight>
                    <Link to={`/ownerdashboard/${this.state.addproperty}`} className="btn btn-primary btn-lg"><font color="white">Add new Property</font></Link>
                </Nav>
                <Nav pullRight>
                    <div className='dropdown'>
                        <button className="btn btn-primary dropdown-toggle btn-lg"
                            type="button" id="dropdownMenu1" data-toggle="dropdown">
                            My Account <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu">
                            <li ><Link to="/propertydetails">Booking details</Link></li>
                            <li ><Link to="/propertylisting">My Properties</Link></li>
                            <li ><Link to="/messagebox">Inbox</Link>
                                <li className="divider"></li>
                            </li>
                            <li><Link to="/home" onClick={this.handleLogout}>Sign Out</Link>

                            </li>
                        </ul>
                    </div>
                </Nav>

            </Navbar>
        </div>);
    }
}

export default OwnerNavbar;