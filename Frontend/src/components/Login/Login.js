import React, { Component } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { getLoginQuery } from '../../queries/queries';
import { withApollo } from 'react-apollo';


// var JWTtoken = localStorage.getItem("token");

// import Profile from '../Profile/Profile'

class Login extends Component {


    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            redirectVar: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        console.log('Componentdidmount' + console.log(this.props.newPost))
        // localStorage.setItem('token', res.data.token);
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value

        })
        //console.log("e.target.value" + e.target.value)
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
                this.props.history.push("/home");

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
    //         // redirectVar=<Redirect to="/home" />
    //         this.props.history.push("/home");
    //     }
    // }


    render() {

        return (
            <div>
                <Navbar>
                    <Link to="/home">
                        <img alt="homeaway logo" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg"></img>
                    </Link>
                    <Nav pullRight>
                        <img alt="homeaway birdhouse" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg"></img>
                    </Nav>

                </Navbar>
                <div className="container">
                    <div className="login-form">
                        <h1>Log in to HomeAway</h1>
                        <h4>Need an account? <Link to="/signup">Sign Up</Link></h4>

                        <div className="main-div">
                            <form onSubmit={this.onSubmit} >

                                <h3>Account login</h3>
                                <hr></hr>
                                <div className="form-group">
                                    <input type='email' className="form-control" placeholder="Email" onChange={this.onChange} name="email" value={this.state.email} required />
                                </div>
                                <div className="form-group">
                                    <input type='password' className="form-control" placeholder="Password" onChange={this.onChange} name="password" value={this.state.password} required />
                                </div>
                                <button type="submit" className="btn btn-primary">Log In</button>
                                <hr></hr>
                            </form>
                            <div>
                                <button className="btn btn-secondary">Log in with Facebook</button>
                            </div>
                            <div>
                                <button className="btn btn-new">Log in with Google</button>
                            </div>
                            {/* <Profile email="email" something='newvalue'></Profile> */}
                        </div>

                    </div>
                </div>


            </div>
        );
    }
}



// Login.propTypes = {
//     fetchLogin: propTypes.func.isRequired,
//     newPost: propTypes.object.isRequired
// }

// const mapStateToProps = state => ({
//     newPost: state.login
// });
// export default reduxForm({
//     validate,
//     form: "NewLoginForm"
// })(connect(null, { fetchLogin })(Login));


// export default connect(mapStateToProps, { getLoginQuery })(Login);
export default withApollo(Login);
//export default compose(graphql(getLoginQuery, { name: "getLoginQuery" }))(Login);
