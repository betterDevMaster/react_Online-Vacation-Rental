import React, { Component } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { Redirect } from 'react-router';
import propTypes from 'prop-types';
import { getLoginQuery } from '../../queries/queries';
import { withApollo } from 'react-apollo';

class OwnerLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value

        })
        // console.log("e.target.value" + e.target.value)
    }
    //submit Login handler to send a request to the node backend
    onSubmit(e) {
        e.preventDefault();
        console.log("this.state.email" + this.state.email)
        console.log("this.state.password" + this.state.password)

        const values = {
            email: this.state.email,
            password: this.state.password
        }

        // this.props.fetchLogin(values);
        this.props.client.query({
            query: getLoginQuery,
            variables: {
                email: this.state.email,
                password: this.state.password
            }
        }).then(res => {
            if (res.data.user.error) {
                alert("Enter Valid Credentials")

            }
            else {
                localStorage.setItem('token', 'JWT ' + res.data.user.jwttoken);
                this.props.history.push("/propertylisting");

            }
            console.log(JSON.stringify(res))

        })
    }
    // componentWillReceiveProps(nextProps) {
    //     console.log("nextProps " + nextProps)
    //     console.log("nextProps " + JSON.stringify(nextProps))
    //     console.log("newpost,lgindata " + nextProps.newPost.loginData)

    //     if (!nextProps.newPost.loginData) {
    //         alert("Enter Valid Credentials")
    //     }
    //     else {
    //         console.log("Login Successful")
    //     }
    // }


    render() {
        //redirect based on successful login
        let redirectVar = null;
        if (localStorage.getItem("token")) {
            redirectVar = <Redirect to="/propertylisting" />
        }
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
                </Navbar>
                <div id="wrap">
                    <div className="left">

                        <img alt="homeaway val" src="https://csvcus.homeaway.com/rsrcs/stab-cms-resources/0.10.35/images/cas/login-banner-sept16-1.png"></img>
                    </div>
                    <div className="right">
                        <form onSubmit={this.onSubmit}>
                            <div class="container">
                                <div class="login-form">
                                    <div class="main-div">
                                        <h3>Owner login</h3>
                                        <h4>Need an account? <Link to="/ownersignup">Sign Up</Link></h4>
                                        <hr></hr>
                                        <div class="form-group">
                                            <input onChange={this.onChange} type="email" class="form-control" name="email" placeholder="Email address" required />
                                        </div>
                                        <div class="form-group">
                                            <input onChange={this.onChange} type="password" class="form-control" name="password" placeholder="Password" required />
                                        </div>
                                        <button class="btn btn-primary">Log In</button>
                                        <hr></hr>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        );
    }
}

OwnerLogin.propTypes = {
    fetchLogin: propTypes.func.isRequired,
    newPost: propTypes.object.isRequired
}

const mapStateToProps = state => ({
    newPost: state.login
});
export default withApollo(OwnerLogin);

// export default connect(mapStateToProps, { fetchLogin })(OwnerLogin);