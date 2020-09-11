import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { Redirect } from 'react-router';
import jwtdecode from 'jwt-decode';


class TravelerNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        // cookie.remove('cookie', { path: '/' });
        localStorage.removeItem('token');
    }
    render() {
        let navLogin = null;
        if (this.state.token) {
            console.log("Able to read token");
            navLogin = (
                <Nav pullRight>
                    <div className='dropdown'>
                        <button className="btn-nav-in dropdown-toggle btn-lg"
                            type="button" id="dropdownMenu1" data-toggle="dropdown">
                            {this.state.username} <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu">
                            <li ><Link to="/mytrips" >My Trips</Link></li>
                            <li ><Link to="/profile" >Profile</Link></li>
                            <li ><Link to="/messagebox">Inbox</Link></li>
                            <li className="divider"></li>
                            <li><Link to="/home" onClick={this.handleLogout}>Logout</Link>

                            </li>
                        </ul>
                    </div>
                </Nav>
            );
        } else {
            //Else display login button
            console.log("Not Able to read token");
            navLogin = (
                <Nav pullRight>
                    <div className='dropdown'>
                        <button className="btn-nav-in dropdown-toggle btn-lg"
                            type="button" id="dropdownMenu1" data-toggle="dropdown">
                            Login <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu">
                            <li ><Link to="/login" >Traveler Login</Link>
                                <li className="divider"></li>
                            </li>
                            <li><Link to="/ownerlogin">Owner Login</Link>

                            </li>
                        </ul>
                    </div>
                </Nav>

            )
        }
        //if not logged in go to login page
        let redirectVar = null;
        // console.log("this.state.name this.state.name" + this.state.token)
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/login" />
        }
        // function getEmail(value) {
        //     var str = value
        //     var email = str.replace("%40", "@");
        //     email = email.substring(7)
        //     console.log("from function getEmail" + email)
        //     return email;
        // }
        return (
            <div>
                {redirectVar}
                <Navbar>
                    <Link to="/home">
                        <img alt="homeaway logo" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg"></img>
                    </Link>
                    <Nav pullRight>
                        <img alt="homeaway birdhouse" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg"></img>
                    </Nav>
                    <Nav className='col-md-6' pullRight>
                        {navLogin}
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

export default TravelerNavbar;