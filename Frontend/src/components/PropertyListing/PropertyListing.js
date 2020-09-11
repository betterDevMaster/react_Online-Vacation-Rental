import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import propTypes from 'prop-types';
import { getPropertyData } from '../../actions/PropertyListingAction';
import OwnerNavbar from '../Navbar/OwnerNavbar';
import jwtdecode from 'jwt-decode';


class PropertyListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberofproperty: [],
            token: false,
            currentemail: '',
            username: ''

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
                username: decoded.user.first_name
            })
        }
        console.log("currentemail" + this.state.currentemail)
    }
    componentDidMount() {
        console.log("this.state.currentemail" + this.state.currentemail)

        this.props.getPropertyData(this.state.currentemail);

        // axios.get(`http://127.0.0.1:3001/propertylisting/${document.cookie}`)
        //     .then((response) => {
        //         if (response.status === 200) {
        //             this.setState({
        //                 numberofproperty: response.data
        //             })
        //             console.log(" response.data" + response.data)

        //         }
        //     }
        //     )
    }
    componentWillReceiveProps(nextProps) {
        if (!nextProps.newValue.propertyListData) {
            console.log("No Data found")
        }
        else {
            this.setState({
                numberofproperty: nextProps.newValue.propertyListData
            })
            console.log("Login Successful")

        }
    }
    render() {


        let details = this.state.numberofproperty.map((property, i) => {
            return (
                <div className="jumbotron vertical-center">
                    <div className="container">
                        <div>Before your property can go live, you need to add some more details. Complete your property</div>
                        <h2>Property {property.headline}</h2>
                        <div>
                            <h4><Link to={`/ownerdashboard/${property._id}`} >Go to Property Update</Link></h4>
                            <div>{property.propertydescription}</div>
                        </div>
                    </div>

                </div>
            )
        })

        return (
            <div>
                <OwnerNavbar />
                <div id='page-content' className='span10'>

                    <div className="main-white-bg">
                        {details}
                    </div>
                </div>
            </div>
        );
    }
}

PropertyListing.propTypes = {
    getTripgetPropertyDatasData: propTypes.func.isRequired,
    newValue: propTypes.string
}

const mapStateToProps = state => ({
    newValue: state.property
});

export default connect(mapStateToProps, { getPropertyData })(PropertyListing);
