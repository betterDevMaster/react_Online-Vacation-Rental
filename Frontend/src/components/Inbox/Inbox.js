import React, { Component } from 'react';
import { connect } from "react-redux";
import propTypes from 'prop-types';
import { sendMessage, getChatHistory } from '../../actions/InboxAction';
import TravelerNavbar from '../Navbar/Navbar2';
import jwtdecode from 'jwt-decode';


class Inbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageObj: [],
            message: '',
            owneremail: '',
            token: false,
            currentemail: '',
            username: '',
            type: ''
        }
        this.onChange = this.onChange.bind(this);
        this.sendMessageHandler = this.sendMessageHandler.bind(this);

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
    onChange(e) {
        this.setState({
            message: this.state.username + '  : ' + e.target.value
        })
    }

    componentDidMount() {
        var messageid = this.props.history.location.pathname.substring(7)
        console.log("messageid +" + messageid)
        this.setState({
            messageid: messageid
        })
        console.log("this.state.messageid  " + this.state.messageid)
        this.props.getChatHistory(messageid);


    }
    sendMessageHandler() {
        // console.log("this.props.location.owneremail" + this.props.location.state.owneremail);
        console.log("this.state.message" + this.state.message)
        console.log("messageid   ++++" + this.state.messageid)
        // preventDefault()
        var message = {
            messageid: this.state.messageid,
            message: this.state.message
        }

        this.props.sendMessage(message)

    }

    componentWillReceiveProps(nextProps) {
        console.log("this.props.NextPRops" + nextProps.travelermessage)
        console.log("this.props.NextPRops .messageData.traveleremail" + JSON.stringify(nextProps.traveleremail))

        this.setState({
            traveleremail: nextProps.traveleremail,
            messageObj: this.state.messageObj.concat(nextProps.travelermessage)
        })
        console.log("messageObj" + this.state.messageObj)
    }

    render() {
        let details = this.state.messageObj.map((message, i) => {
            return (
                <div>
                    <span> {message}</span>
                    <hr className='hr-msg'></hr>
                </div>

            )
        })

        return (<div>
            <TravelerNavbar />

            <h3>Your Messages</h3>
            <div className="jumbotron-msg">
                <div className="container">
                    <ul className="collection">
                        {/* {isFetching ? <div>Loading...</div> : ( */}
                        <div>
                            <p>
                                <i className="prefix mdi-action-alarm" />
                                <br />
                                {details}


                            </p>
                        </div>

                    </ul>
                    <div className="row">
                        <form onSubmit={this.sendMessageHandler}>
                            <div><textarea onChange={this.onChange} className="text-message" placeholder='Send a Message to Owner' />
                                <button className="btn btn-primary btn-msg"  >Send    </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </div>);
    }
}
Inbox.propTypes = {
    sendMessage: propTypes.func.isRequired,
    traveleremail: propTypes.object,
    travelermessage: propTypes.object
}

const mapStateToProps = state => ({
    traveleremail: state.inbox.chatData.traveleremail,
    travelermessage: state.inbox.chatData.travelermessage
});

export default connect(mapStateToProps, { sendMessage, getChatHistory })(Inbox);