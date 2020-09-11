import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import axios from 'axios';
import propTypes from 'prop-types';
import TravelerNavbar from '../Navbar/Navbar2';
import { graphql, compose } from 'react-apollo';
import { updateUser } from '../../mutation/mutations';
import jwtdecode from 'jwt-decode';
var swal = require('sweetalert');


// import Login from "../Login/Login"
// var AUTH_TOKEN = sessionStorage.getItem('token')
// axios.defaults.headers.common['authorization'] = AUTH_TOKEN;




class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: [],
            first_name: "",
            last_name: "",
            about_me: "",
            city: "",
            company: "",
            school: "",
            hometown: "",
            languages: "",
            gender: "",
            imageView: "",
            profile_photo: "",
            description: '',
            selectedFile: '',
            token: false,
            currentemail: '',
            username: ''
            //something: this.props.somethin
        }
        this.saveChangeHandler = this.saveChangeHandler.bind(this);
        this.onPhotoChange = this.onPhotoChange.bind(this);
        this.onChange = this.onChange.bind(this);
    };


    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log("e.target.value" + e.target.value)
    }
    //Photo Code
    onPhotoChange = (e) => {
        e.preventDefault();
        if (e.target.name === 'selectedFile') {
            //  this.setState({
            var selectedFile = e.target.files[0]
            console.log(" e.target.files[0]" + e.target.files[0])
            //  })
            console.log("e.target.value" + e.target.value.substring(12))
            console.log("e.target.name" + e.target.name)

        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
        console.log("{selectedFile} Only" + selectedFile)

        console.log("{selectedFile}" + JSON.stringify(this.state.selectedFile))
        let formData = new FormData();
        formData.append('selectedFile', selectedFile);
        axios.post(`http://localhost:3001/profilepicture`, formData)
            .then((result) => {
                // access results...
                console.log("PrintSomething")
                return axios.post(`http://localhost:3001/uploadprofilepicture/${this.state.currentemail}`)
                    .then((result) => {
                        // access results...
                        console.log("result value " + JSON.stringify(result.data))
                        return axios.post('http://localhost:3001/propertyresults/photo/' + result.data)
                            .then(response => {
                                console.log("Imgae Res : ", response);
                                let imagePreview = 'data:image/jpg;base64, ' + response.data;
                                this.setState({
                                    imageView: imagePreview
                                })
                            });
                    });
            });

    }


    //get the profile data from backend  
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
    componentDidMount() {

        console.log("currentemail" + this.state.currentemail)
        // this.props.getProfileData(this.state.currentemail)

        // console.log("this.props.getProfile"+this.props.getProfile)
        axios.get(`http://localhost:3001/profile/${this.state.currentemail}`)
            .then((response) => {
                console.log("response.data" + JSON.stringify(response));
                this.setState({
                    profile: response.data,
                    // profile: this.props.getProfile
                });
                console.log("profile [0]   " + this.state.profile.first_name)
                this.setState({
                    first_name: this.state.profile.first_name,
                    last_name: this.state.profile.last_name,
                    about_me: this.state.profile.about_me,
                    city: this.state.profile.city,
                    school: this.state.profile.school,
                    company: this.state.profile.company,
                    hometown: this.state.profile.hometown,
                    languages: this.state.profile.languages,
                    gender: this.state.profile.gender,
                    profile_photo: this.state.profile.profile_photo
                })

                console.log("response.data" + response.data)
                console.log("response.data JSON" + JSON.stringify(response.data))
                console.log("profile JSOM " + JSON.stringify(this.state.profile))

                console.log("response.data.first_name" + response.data.profile)
                console.log("profile " + this.state.profile)
                console.log("profile [0]   " + this.state.profile.first_name)

                if (this.state.profile.profile_photo === undefined) {
                    console.log("upload picture")
                }
                else {
                    axios.post('http://localhost:3001/propertyresults/photo/' + this.state.profile.profile_photo)
                        .then(response => {
                            console.log("Imgae Res : ", response);
                            let imagePreview = 'data:image/jpg;base64, ' + response.data;
                            this.setState({
                                imageView: imagePreview
                            })
                        })

                }

            });
    }
    saveChangeHandler(event) {
        //prevent page from refresh
        event.preventDefault();
        const data = {
            email: this.state.currentemail,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            about_me: this.state.about_me,
            city: this.state.city,
            company: this.state.company,
            school: this.state.school,
            hometown: this.state.hometown,
            languages: this.state.languages,
            gender: this.state.gender,
            //profile_photo:this.state.profile_photo

        }
        //call Update action here
        //this.props.updateProfile(data);
        this.props.updateUser({
            variables: {
                email: this.state.currentemail,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                about_me: this.state.about_me,
                city: this.state.city,
                company: this.state.company,
                school: this.state.school,
                hometown: this.state.hometown,
                languages: this.state.languages,
                gender: this.state.gender,

            },
        }).then(res => {
            if (res.data) {
                swal("Update Successful", "", "success")
            }
        })
    }
    // componentWillReceiveProps(nextProps) {
    //     console.log("nextProps " + nextProps)
    //     console.log("nextProps " + JSON.stringify(nextProps))
    //     console.log("newpost,lgindata " + nextProps.update)

    //     if (!nextProps.update) {
    //         console.log("No Data found")
    //     }
    //     else {
    //         console.log("Update  Successful")
    //         swal("Update Successful", "", "success")

    //     }
    // }

    render() {
        return (
            <div>
                <TravelerNavbar />
                <div className="container">
                    <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item"><Link to="/messagebox">Inbox</Link></li>
                        <li className="nav-item"><Link to="/mytrips">My Trips</Link></li>
                        <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#myprofile" role="tab" >Profile</a></li>
                        <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#account">Account</a></li>
                    </ul>

                    <div className="tab-content">
                        <div id="inbox" className="tab-pane">
                            <textarea placeholder='Send a Message to Owner'></textarea>
                            <p>No Messages</p>
                            <button className="btn btn-primary"><Link to='/home'>Start your Search</Link></button>
                        </div>

                        {/* <div id="trips" className="tab-pane">
                            <p>Trips Information</p>
                            <p>This is Trip Information.</p>
                        </div> */}
                        <div id="myprofile" className="tab-pane active" >

                            <div className="img-circle user-photo"><Image src={this.state.imageView} circle className="profile-pic col-md-offset-5 col-md-2  " />
                                {/* <div className="col-md-offset-5 col-md-2 ">
                                    <input
                                        type="file"
                                        name="selectedFile"
                                        onChange={this.onPhotoChange}
                                    />
                                </div> */}
                                <div className="profilepicuploadbutton">
                                    <label for="uploadpic" name="description" onChange={this.onPhotoChange} className="btn btn-success">SELECT PHOTO TO UPLOAD</label>
                                    <input type="file" id="uploadpic" className="hidethis" name="selectedFile" onChange={this.onPhotoChange} />
                                </div>
                            </div>

                            <div className="container col-md-12 row-4">
                                <div className="main-div-profile">
                                    <h2> Profile Information</h2>
                                    <div className="form-group">
                                        <input onChange={this.onChange} type="text" value={this.state.first_name} className="form-control" name="first_name" placeholder="First Name" required />
                                    </div>
                                    <div className="form-group">
                                        <input onChange={this.onChange} type="text" value={this.state.last_name} className="form-control" name="last_name" placeholder="Last Name" required />
                                    </div>
                                    <div className="form-group">
                                        <input onChange={this.onChange} type="text" value={this.state.about_me} className="form-control" name="about_me" placeholder="About Me" required />
                                    </div>
                                    <div className="form-group">
                                        <input onChange={this.onChange} type="text" value={this.state.city} className="form-control" name="city" placeholder="My city,country" required />
                                    </div>
                                    <div className="form-group">
                                        <input onChange={this.onChange} type="text" value={this.state.company} className="form-control" name="company" placeholder="Company" required />
                                    </div>
                                    <div className="form-group">
                                        <input onChange={this.onChange} type="text" value={this.state.school} className="form-control" name="school" placeholder="School" required />
                                    </div>

                                    <div className="form-group">
                                        <input onChange={this.onChange} type="text" value={this.state.hometown} className="form-control" name="hometown" placeholder="Hometown" required />
                                    </div>
                                    <div className="form-group">
                                        <input onChange={this.onChange} type="text" value={this.state.languages} className="form-control" name="languages" placeholder="Languages" required />
                                    </div>
                                    <div className="form-group">
                                        <input onChange={this.onChange} type="text" value={this.state.gender} className="form-control" name="gender" placeholder="Gender" required />
                                    </div>
                                    <span>
                                    </span>
                                    <button className="btn btn-primary" onClick={this.saveChangeHandler}>Submit</button>
                                </div>
                            </div>

                        </div>
                        <div id="account" className="tab-pane">
                            <p>Account Information</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
Profile.propTypes = {
    updateProfile: propTypes.func.isRequired,
    update: propTypes.string.isRequired
}

const mapStateToProps = state => ({
    update: state.profile.profileFlag,
    getProfile: state.profile.profileData
});
export default compose(graphql(updateUser, { name: "updateUser" }))(Profile);

// export default connect(mapStateToProps, { updateProfile, getProfileData })(Profile);