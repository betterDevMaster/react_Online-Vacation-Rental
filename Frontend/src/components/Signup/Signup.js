import React, { Component } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { graphql, compose } from 'react-apollo';
import { addUserMutation } from '../../mutation/mutations';
var swal = require('sweetalert');


class Signup extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            usertype: "",
            redirectVar: ""
        }
        //Bind the handlers to this class
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value

        })
    }
    //submit Login handler to send a request to the node backend
    onSubmit = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            usertype: "traveler"
        }
        console.log(this.state);

        this.props.addUserMutation({
            variables: {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                password: this.state.password,
                user_type: "traveler"

            },
        }).then(res => {
            console.log("newval " + JSON.stringify(res));
            if (res.data.addUser.email) {
                swal("Signup Successful", "", "success")
            }

        })

        //callaction
        //this.props.signupUser(data);
    }
    // componentWillReceiveProps(nextProps) {
    //     console.log("nextProps " + nextProps)
    //     console.log("nextProps " + JSON.stringify(nextProps))
    //     console.log("newpost,lgindata " + nextProps.newPost.signupData)

    //     if (!nextProps.newPost.signupData) {
    //         alert("Email Already Exist Use Another Email ID to Register!")
    //     }
    //     else {
    //         console.log("Signup Successful")
    //         swal("Signup Successful", "", "success")

    //     }
    // }

    render() {
        //redirect based on successful login
        // let redirectVar = null;
        // if (localStorage.getItem("token")) {
        //     redirectVar = <Redirect to="/home" />
        // }
        // { this.state.redirectVar }
        return (
            <div>
                <Navbar>
                    <Link to="/home">
                        <img alt="homeaway logo" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg"></img>
                    </Link>
                    <Nav pullRight>
                        <img alt="homeaway birdhouse " src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg"></img>
                    </Nav>
                </Navbar>
                <form onSubmit={this.onSubmit}>
                    <div className="container">
                        <div className="login-form">
                            <h1>Sign up for HomeAway</h1>
                            <h4>Already have an account?<Link to="/login">Log in</Link></h4>

                            <div className="main-div">
                                <div className="form-group" className="row">
                                    <div className="column">
                                        <input onChange={this.onChange} type="text" className="form-control" name="first_name" placeholder="First Name" required />
                                    </div>
                                    <div className="column">
                                        <input onChange={this.onChange} type="text" className="form-control" name="last_name" placeholder="Last Name" required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input onChange={this.onChange} type="email" className="form-control" name="email" placeholder="Email address" required />
                                </div>
                                <div className="form-group">
                                    <input onChange={this.onChange} type="password" className="form-control" name="password" placeholder="Password" required />
                                </div>
                                <button className="btn btn-primary">Sign Me Up</button>
                                <div>
                                    <button className="btn btn-secondary">Log in with Facebook</button>
                                </div>
                                <div>
                                    <button className="btn btn-new">Log in with Google</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </form>

            </div>
        );
    }
}

// Signup.propTypes = {
//     signupUser: propTypes.func.isRequired,
//     newPost: propTypes.string
// }

// const mapStateToProps = state => ({
//     newPost: state.signup
// });
// export default connect(mapStateToProps, { signupUser })(Signup);
export default compose(graphql(addUserMutation, { name: "addUserMutation" }))(Signup);