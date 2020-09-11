import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavbarBrand } from 'react-bootstrap';
import { Link } from 'react-router-dom';
class Navbar1 extends Component {
    state = {}
    render() {
        return (
            <Navbar default collapseOnSelect>
                <Navbar.Header>
                    <Nav pullLeft>
                        <Link to="/home">
                            <img src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg">
                            </img>
                        </Link>
                    </Nav>

                    <Nav pullRight>
                        <img src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg">
                        </img>
                    </Nav >
                </Navbar.Header>
            </Navbar>
        );
    }
}

export default Navbar1;