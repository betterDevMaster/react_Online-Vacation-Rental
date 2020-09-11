import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { connect } from "react-redux";
import TravelerNavbar from '../Navbar/Navbar2';
import _ from 'lodash';
var swal = require('sweetalert');


class PropertyResult extends Component {
    // state = {}
    constructor(props) {
        super(props);
        this.state = {
            parseProperty: '',
            Propertydetails: [],
            imageView: [],
            price: '',
            bedrooms: '',
            activePage: 1,
            current: 1,
            itemsPerPage: 10,
        }
        this.priceChangeHandler = this.priceChangeHandler.bind(this);
        this.bedroomChangeHandler = this.bedroomChangeHandler.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
    }

    clickHandler(e) {
        this.setState({
            current: Number(e.target.id)
        });
    }

    componentDidMount() {
        // var getPropertydetails = sessionStorage.getItem("newval")
        // console.log("getPropertydetails" + getPropertydetails)
        // var parseProperty = JSON.parse(getPropertydetails)
        // console.log("parseProperty" + parseProperty[0].propertydescription)
        // console.log("property_id" + parseProperty[0].property_id)
        // console.log("Propertydetails parseProperty" + parseProperty[0].property_id)

        console.log("this.props" + JSON.stringify(this.props))
        // console.log("nextProps " + nextProps)
        // console.log("nextProps " + JSON.stringify(nextProps))

        console.log("history " + JSON.stringify(this.props.history))
        console.log("this.props.home.profileData " + JSON.stringify(this.props.newValue.searchData))
        this.setState({
            Propertydetails: this.props.newValue.searchData
        })
        // this.setState({
        //     parseProperty: this.props.newValue.searchData
        // })

        // if (this.props.newValue.searchData.length === 0) {
        //     swal("Could not find Properties with your search criteria", "Try Searching for other properties")
        // }

        var imageArr = [];


        // var photoList = parseProperty[0].photo_uploads.substring(1).split(',');
        // console.log("photoList" + photoList)

        console.log("this.props.newValue.searchData.length" + JSON.stringify(this.props))
        console.log("this.state.parseProperty.length" + this.state.parseProperty.length)
        for (let i = 0; i < this.props.newValue.searchData.length; i++) {

            //     var photoList = this.state.propertyDetails.property_id.split(',');
            // console.log("photoList"+photoList)

            // axios.post('http://localhost:3001/propertyresults/photo/' + this.props.newValue.searchData[i].photo_uploads.substring(1).split(',')[0])
            //     .then(response => {
            //         console.log("Imgae Res : ", response);
            //         let imagePreview = 'data:image/jpg;base64, ' + response.data;
            //         imageArr.push(imagePreview)
            //         console.log("imageArr " + imageArr)
            //         this.props.newValue.searchData[i].photo_uploads = imagePreview;
            //       
            //         console.log("this.state.Propertydetails " + this.state.Propertydetails)
            //     })
        }
    }
    priceChangeHandler(event) {
        this.setState({
            price: event.target.value
        })

    }
    bedroomChangeHandler(event) {
        this.setState({
            bedrooms: event.target.value
        })

    }
    clearFilter() {
        this.setState({
            Propertydetails: this.props.newValue.searchData,
            price: '',
            bedroom: ''
        })

    }
    applyFilter() {
        if (this.state.price && this.state.bedrooms) {
            console.log("this.state.price && this.state.bedrooms " + this.state.price + ' ' + this.state.bedrooms)
            let newlyDisplayed = _.filter(this.props.newValue.searchData, property => (property.price <= this.state.price) && (property.bedroom <= this.state.bedrooms))
            console.log("newlyDisplayed " + newlyDisplayed)
            this.setState({
                Propertydetails: newlyDisplayed
                //? this.state.tripdetails : newlyDisplayed
            })
        }
        else {
            console.log("tripdetails " + JSON.stringify(this.state.tripdetails))
            this.setState({
                Propertydetails: this.props.newValue.searchData
                //? this.state.bookingdetails : newlyDisplayed
            })
        }
    }


    render() {

        const { current, itemsPerPage } = this.state;
        const indexOfLastPage = current * itemsPerPage;
        const indexOfFirstPage = indexOfLastPage - itemsPerPage;
        const currentListTorun = this.state.Propertydetails.slice(indexOfFirstPage, indexOfLastPage);
        console.log("Number of properties : " + this.state.Propertydetails.length);

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.props.newValue.searchData.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }

        const showPageNumbers1 = pageNumbers.map(number => {
            return (
                <li class="page-item active"
                    key={number}
                    id={number}
                    onClick={this.clickHandler}
                    className="nums"
                >
                    {number}
                </li>
            );
        });

        // let Image = this.state.imageView.map(value => {
        //     return (
        //         <div>
        //             <img className="property-image" src={value} alt="property-img"></img>
        //         </div>
        //     )
        // })
        let details = currentListTorun.map((property, i) => {
            return (
                <div className="jumbotron vertical-center">
                    <div className="container">
                        <td key={i}>

                            <td>
                                {/* <div className="col-md-1"> */}
                                {/* <div className="property-content-image col-3"> */}
                                <Carousel showThumbs={false} className="carousel-slide-search">
                                    <img className="property-image" src={property.photo_uploads} alt="property" />
                                    {/* </div> */}
                                </Carousel>
                                {/* </div> */}

                            </td>
                            <td className="col-gap"></td>

                            <td>
                                <div>
                                    <h2><Link to={`/viewproperty/${property.id}`} >{property.headline}</Link></h2>
                                    <h5>{property.propertydescription}</h5>
                                </div>
                                <div>
                                    <tr><strong>{property.type}  </strong></tr>
                                    <tr>
                                        <td>{property.bedroom} BR</td>
                                        <td>{property.bathroom} BA  </td>

                                    </tr>
                                    <tr>  Sleeps {property.accomodates}</tr>
                                </div>
                                <div>
                                    <td>${property.price} avg/night</td>
                                </div>
                                {/* <div>
                                <img src={this.state.imageView}></img>
                            </div> */}
                            </td>

                        </td>
                    </div>
                </div>
            )
        })




        return (
            <div>
                <TravelerNavbar />
                <div className="main-white-bg">
                    <div>
                        <input type="text" className="input-button" value={this.props.newValue.userData.location}></input>
                        <input type='date' className='input-button' name='arrivaldate' value={this.props.newValue.userData.arrivaldate} placeholder='Arrive' required></input>
                        <input type='date' className='input-button' name='departdate' value={this.props.newValue.userData.departdate} placeholder='Depart' required></input>

                    </div>
                    <hr className='Hr'></hr>
                    <div className='SearchBar'>

                        {/* <Link to="#" class="dropdown-toggle" data-toggle="dropdown"><font color="black">Price   </font></Link>
                        <ul class="dropdown-menu">
                            <div className="slider1 widthh">
                                <span className="slidetxt">$0 to {this.state.price}</span>
                                <input class="slider" type="range" min="0" max="1000" step="1" name='price' value={this.state.price} onChange={this.priceChangeHandler} />
                                <span className='caret'></span>
                            </div>
                        </ul>
                        &nbsp; &nbsp; &nbsp;
                            <Link to="#" class="dropdown-toggle" data-toggle="dropdown"><font color="black">Bedrooms</font></Link>
                        <ul class="dropdown-menu">
                            <div className="slider1 widthh">
                                <span className="slidetxt">0 to {this.state.bedrooms}</span>
                                <input class="slider" type="range" min="0" max="10" step="1" name='bedrooms' value={this.state.bedrooms} onChange={this.bedroomChangeHandler} />
                                <span className='caret'></span>
                            </div>
                        </ul> */}

                        {/* <a href="#" class="dropdown-toggle" data-toggle="dropdown"><font color="black">Price   </font></a> <span className='caret'></span>
                        <ul class="dropdown-menu">
                            <div className="slider1 widthh">
                                <span className="slidetxt">$0 to {this.state.price}</span>
                                <input class="slider" type="range" min="0" max="1000" step="1" name='price' value={this.state.price} onChange={this.priceChangeHandler} />

                            </div>
                        </ul>
                        &nbsp; &nbsp; &nbsp;
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown"><font color="black">Bedrooms</font></a> <span className='caret'></span>
                        <ul class="dropdown-menu">
                            <div className="slider1 widthh">
                                <span className="slidetxt">0 to {this.state.bedrooms}</span>
                                <input class="slider" type="range" min="0" max="10" step="1" name='bedrooms' value={this.state.bedrooms} onChange={this.bedroomChangeHandler} />

                            </div>
                        </ul> */}
                        <li class="dropdown  fontprop menu-items">
                            <Link to="#" class="dropdown-toggle" data-toggle="dropdown"><font color="black">Price</font></Link>

                            <ul class="dropdown-menu nav navbar-nav pull-left">
                                <div className="slider1 widthh">
                                    <span className="slidetxt">$0 to {this.state.price}</span>
                                    <input class="slider" type="range" min="0" max="1000" step="1" value={this.state.price} onChange={this.priceChangeHandler} />
                                </div>
                            </ul>
                        </li>
                        <li class="dropdown  fontprop menu-items1">
                            <Link to="#" class="dropdown-toggle" data-toggle="dropdown"><font color="black">Bedrooms</font></Link>
                            <ul class="dropdown-menu">
                                <div className="slider1 widthh">
                                    <span className="slidetxt">0 to {this.state.bedrooms}</span>
                                    <input class="slider" type="range" min="0" max="10" step="1" value={this.state.bedrooms} onChange={this.bedroomChangeHandler} />
                                </div>
                            </ul>
                        </li>

                        <button onClick={this.applyFilter} className='input-group-btn' className="btn btn-primary" >Apply Filter</button>
                        {/* Number of results:  {currentListTorun.length} */}
                        <button onClick={this.clearFilter} className='input-group-btn' className="btn btn-primary" >Clear Filter</button>

                        <h4 className='total-res'> Total Results Found: {this.state.Propertydetails.length}</h4>

                    </div>

                    <hr className='Hr'></hr>
                    {details}


                </div>
                <div className="page">
                    {showPageNumbers1}
                </div>

            </div >
        );
    }
}

const mapStateToProps = state => ({
    newValue: state.home
});
export default connect(mapStateToProps)(PropertyResult);