import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavbarBrand } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';

class HomeNavbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }

        this.handleLogout = this.handleLogout.bind(this);

    }
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
    }
    render() {
        //if Cookie is set render Logout Button
        let navLogin = null;
        if (cookie.load('cookie')) {
            console.log("Able to read cookie");
            navLogin = (
                <Nav pullRight>
                    <div className='dropdown'>
                        <button className="btn-nav dropdown-toggle btn-lg"
                            type="button" id="dropdownMenu1" data-toggle="dropdown">
                            {getEmail(document.cookie)} <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu">
                            <li ><a href="/mytrips" >My Trips</a></li>
                            <li ><a href="/profile" >Profile</a></li>
                            <li ><a href="/dashboard">Dashboard</a></li>
                            <li className="divider"></li>
                            <li><a href="/home" onClick={this.handleLogout}>Logout</a>

                            </li>
                        </ul>
                    </div>
                </Nav>
            );
        } else {
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <div>
                    <Nav pullRight>
                        <div className='dropdown'>
                            <button className="btn-nav dropdown-toggle btn-lg"
                                type="button" id="dropdownMenu1" data-toggle="dropdown">
                                Login <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu">
                                <li ><a href="/login" >Traveler Login</a>
                                    <li className="divider"></li>
                                </li>
                                <li><a href="/ownerlogin">Owner Login</a>

                                </li>
                            </ul>
                        </div>
                    </Nav>
                    {/* <Nav pullRight>
                        <img alt="homeaway birdhouse" src="https://csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/birdhouse-bceheader-white.svg">
                        </img>
                    </Nav> */}
                </div>

            )
        }

        function getEmail(value) {
            var str = value
            var email = str.replace("%40", "@");
            var email = email.substring(7)
            console.log("from function getEmail" + email)
            return email;
        }
        return (
            <div>
                {navLogin}
            </div>
            // <Navbar default collapseOnSelect>
            //     <Navbar.Header>
            //         <Nav pullLeft>
            //             <Link to="/home">
            //                 <img src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg">
            //                 </img>
            //             </Link>
            //         </Nav>

            //         <Nav pullRight>
            //             <img src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg">
            //             </img>
            //         </Nav >
            //     </Navbar.Header>
            // </Navbar>
        );
    }
}

export default HomeNavbar;