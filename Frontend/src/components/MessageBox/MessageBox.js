import React, { Component } from 'react';
import TravelerNavbar from '../Navbar/Navbar2';
import { getMessageBox } from '../../actions/InboxAction';
import { connect } from "react-redux";
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import jwtdecode from 'jwt-decode';
import OwnerNavbar from '../Navbar/OwnerNavbar'


class MessageBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messagebox: [],
            token: false,
            currentemail: '',
            username: '',
            type: ''
        }
        // this.onInputChange = this.onInputChange.bind(this)
        // this.onInputDateChange = this.onInputDateChange.bind(this)
    }
    componentWillMount() {
        console.log("localStorage.getItem" + localStorage.getItem("token"))
        if (localStorage.getItem("token")) {
            var decoded = jwtdecode(localStorage.getItem("token"));
            console.log("decoded  " + JSON.stringify(decoded))
            this.setState({
                token: true,
                currentemail: decoded.user.email,
                username: decoded.user.first_name,
                type: decoded.user.user_type
            })
        }
        console.log("currentemail" + this.state.currentemail)
    }
    componentDidMount() {
        console.log("componentDidMount")
        var data = {
            type: this.state.type,
            email: this.state.currentemail
        }
        this.props.getMessageBox(data);
    }
    componentWillReceiveProps(nextProps) {
        console.log('nextProps.newValue ' + JSON.stringify(nextProps.newValue))
        this.setState({
            messagebox: nextProps.newValue
        })
    }
    render() {
        var details = null
        var isowner = null
        if (this.state.type === 'owner') {
            isowner = true
            details = this.state.messagebox.map((message, i) => {
                return (
                    <div>
                        <div className="jumbotron vertical-center-message">
                            <div className="container">
                                <table>
                                    <th><font color='blue'><Link to={`/ownerinbox/${message._id}`}>Message:    {message.headline}</Link></font></th>
                                    <tr><strong>Traveler Email:    {message.traveleremail}</strong></tr>
                                    <tr>Location:    {message.location}</tr>
                                    <tr>State:    {message.state}</tr>

                                    {/* <tr><strong>Traveler Email:    {message.traveleremail}</strong></tr>   */}
                                </table>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        else {
            isowner = false
            details = this.state.messagebox.map((message, i) => {
                return (
                    <div>
                        <div className="jumbotron vertical-center-message">
                            <div className="container">
                                <table>
                                    <th><font color='blue'><Link to={`/inbox/${message._id}`}>Message:    {message.headline}</Link></font></th>
                                    <tr><strong>Owner Email:    {message.owneremail}</strong></tr>
                                    <tr>Location:    {message.location}</tr>
                                    <tr>State:    {message.state}</tr>


                                </table>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        return (
            <div>
                {isowner && (
                    <OwnerNavbar />
                )}
                {!isowner && (
                    <TravelerNavbar />
                )}
                {details}
            </div>
        );
    }
}


MessageBox.propTypes = {
    getMessageBox: propTypes.func.isRequired,
    newValue: propTypes.string
}

const mapStateToProps = state => ({
    newValue: state.inbox.messageBox
});

export default connect(mapStateToProps, { getMessageBox })(MessageBox);
