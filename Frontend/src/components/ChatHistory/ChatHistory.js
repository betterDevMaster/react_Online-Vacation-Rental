import React, { Component } from 'react';
import { connect } from "react-redux";
import { getChatHistory } from '../../actions/InboxAction';
import jwtdecode from 'jwt-decode';



class ChatHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageObj: [],
            token: false,
            currentemail: '',
            username: '',
            type: ''

        }
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
        console.log("Inside Component did mount")
        var data = {
            currentemail: this.state.currentemail,
            emailfrominbox: this.state.emailfrominbox,
            type: this.state.type
        }

        this.props.getChatHistory(data);
    }
    componentWillReceiveProps(nextProps) {

    }
    render() {
        // const { isFetching } = this.state
        console.log('this.props.oldValue Render' + this.props.oldValue)
        console.log(' this.state.messageObj' + JSON.stringify(this.state.messageObj))
        let details = null
        if (this.state.messageObj) {

            details = this.state.messageObj.map((message, i) => {
                return (
                    <div>
                        <span> {message}</span>
                        <hr></hr>
                    </div>

                )
            })
        }
        else {
            this.state.messageObj.map((message, i) => {
                return (
                    <div>
                        <span></span>
                        <hr></hr>
                    </div>
                )
            })
        }

        return (<ul className="collection">
            {/* {isFetching ? <div>Loading...</div> : ( */}
            <div>
                <p>
                    <i className="prefix mdi-action-alarm" />
                    <br />
                    {details}
                </p>
            </div>
        </ul>)
    }
}
const mapStateToProps = (state) => ({
    // newValue: state.inbox.messageData,
    // oldValue: state.inbox.chatData,
    // fromMessageBox: state.inbox.messageBox
});

export default connect(mapStateToProps, { getChatHistory })(ChatHistory);