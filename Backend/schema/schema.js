const graphql = require('graphql');
const _ = require('lodash');
var { Users } = require('../models/users');
var { Properties } = require('../models/properties');
var { Bookings } = require('../models/bookings');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtkey = require('../config/keys');
var GraphQLDate = require('graphql-date')




const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = graphql;



const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        phone_no: { type: GraphQLString },
        about_me: { type: GraphQLString },
        city: { type: GraphQLString },
        country: { type: GraphQLString },
        company: { type: GraphQLString },
        school: { type: GraphQLString },
        hometown: { type: GraphQLString },
        languages: { type: GraphQLString },
        gender: { type: GraphQLString },
        properties: { type: GraphQLString },
        user_type: { type: GraphQLString },
        error: { type: GraphQLString },
        jwttoken: { type: GraphQLString }
    })
});

const PropertyType = new GraphQLObjectType({
    name: 'Property',
    fields: () => ({
        id: { type: GraphQLString },
        email: { type: GraphQLString },
        accomodates: { type: GraphQLInt },
        available_from: { type: GraphQLDate },
        available_to: { type: GraphQLDate },
        bathroom: { type: GraphQLInt },
        bedroom: { type: GraphQLInt },
        building: { type: GraphQLString },
        city: { type: GraphQLString },
        country: { type: GraphQLString },
        headline: { type: GraphQLString },
        min_stays: { type: GraphQLInt },
        price: { type: GraphQLInt },
        propertydescription: { type: GraphQLString },
        state: { type: GraphQLString },
        streetaddress: { type: GraphQLString },
        type: { type: GraphQLString },
        zipcode: { type: GraphQLInt }
    })
})

const BookingType = new GraphQLObjectType({
    name: 'Booking',
    fields: () => ({
        id: { type: GraphQLString },
        location: { type: GraphQLString },
        fromdate: { type: GraphQLString },
        todate: { type: GraphQLString },
        guests: { type: GraphQLString },
        email: { type: GraphQLString },
        property_id: { type: GraphQLString },
        owneremail: { type: GraphQLString },
        prp_headline: { type: GraphQLString },
        prp_streetaddress: { type: GraphQLString },
        prp_state: { type: GraphQLString },
        prp_zipcode: { type: GraphQLString },
        propertydescription: { type: GraphQLString }
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            async resolve(parent, args) {
                const user = await Users.findOne({
                    email: args.email
                })
                if (user) {
                    var hashpass = await bcrypt.compare(args.password, user.password)
                    if (hashpass) {
                        var token = await jwt.sign({ user: user }, jwtkey.secret, { expiresIn: '10080s' })
                    }
                    return { jwttoken: token };
                }
                else {
                    return { error: "User does not exists" }
                }
            },
        },


        property: {
            type: new GraphQLList(PropertyType),
            args: {
                location: { type: GraphQLString },
                arrivaldate: { type: GraphQLString },
                departdate: { type: GraphQLString },
                guests: { type: GraphQLString },
            },
            async resolve(parent, args) {
                var properties = await Properties.find({
                    $and: [
                        { city: { '$regex': new RegExp('^' + args.location + '$', "i"), '$options': 'i' } },
                        { available_from: { $lte: args.arrivaldate } },
                        { available_to: { $gte: args.departdate } },
                        { min_stays: { $lte: args.guests } },
                        { accomodates: { $gte: args.guests } },
                        // { _id: { $nin: bookingArray } }
                    ]

                })
                console.log("prop " + properties)
                return properties
            }
        },
        ownerbooking: {
            type: new GraphQLList(BookingType),
            args: {
                email: { type: GraphQLString },
            },
            async resolve(parent, args) {
                console.log(JSON.stringify(args))
                var bookingdata = await Bookings.find({
                    owneremail: args.email
                })
                console.log("bookingdata " + bookingdata)
                return bookingdata
            }

        },
        travelerbooking: {
            type: new GraphQLList(BookingType),
            args: {
                email: { type: GraphQLString },
            },
            async resolve(parent, args) {
                console.log(JSON.stringify(args))
                var bookingdata = await Bookings.find({
                    email: args.email
                })
                console.log("bookingdata " + bookingdata)
                return bookingdata
            }

        }
    }
});





var count = 10;
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                first_name: { type: GraphQLString },
                last_name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                user_type: { type: GraphQLString },

            },
            async resolve(parent, args) {
                var password = args.password;
                var salt = bcrypt.genSaltSync(10);
                var hashedpassword = bcrypt.hashSync(password, salt);
                console.log('args ' + args)
                var users = new Users({
                    first_name: args.first_name,
                    last_name: args.last_name,
                    email: args.email,
                    password: hashedpassword,
                    user_type: args.user_type
                })
                var userdata = await users.save()
                console.log("users", userdata);
                if (userdata)
                    return userdata;
                else {
                    return { error: "User does not exists" }
                }
            }

        },
        updateUser: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                about_me: { type: GraphQLString },
                city: { type: GraphQLString },
                country: { type: GraphQLString },
                school: { type: GraphQLString },
                hometown: { type: GraphQLString },
                languages: { type: GraphQLString },
                gender: { type: GraphQLString },
                company: { type: GraphQLString }
            },
            async resolve(parent, args) {
                var updateduser = await Users.findOneAndUpdate(
                    { email: args.email },
                    {
                        $set: {
                            about_me: args.about_me,
                            city: args.city,
                            country: args.country,
                            school: args.school,
                            hometown: args.hometown,
                            languages: args.languages,
                            gender: args.gender,
                            company: args.company
                        }
                    })
                console.log("users", updateduser);
                if (updateduser)
                    return updateduser;
                else {
                    return { error: "User does not exists" }
                }
            }

        },
        bookProperty: {
            type: BookingType,
            args: {
                location: { type: GraphQLString },
                fromdate: { type: GraphQLString },
                todate: { type: GraphQLString },
                guests: { type: GraphQLString },
                email: { type: GraphQLString },
                property_id: { type: GraphQLString },
                owneremail: { type: GraphQLString },
                prp_headline: { type: GraphQLString },
                prp_streetaddress: { type: GraphQLString },
                prp_state: { type: GraphQLString },
                prp_zipcode: { type: GraphQLString },
                propertydescription: { type: GraphQLString },

            },
            async resolve(parent, args) {
                console.log('args ' + args)
                var bookings = new Bookings({
                    location: args.location,
                    fromdate: args.fromdate,
                    todate: args.todate,
                    guests: args.guests,
                    email: args.email,
                    property_id: args.property_id,
                    owneremail: args.owneremail,
                    prp_headline: args.prp_headline,
                    prp_streetaddress: args.prp_streetaddress,
                    prp_state: args.prp_state,
                    prp_zipcode: args.prp_zipcode,
                    propertydescription: args.propertydescription,
                })

                var bookdata = await bookings.save()
                console.log("users", bookdata);
                if (bookdata)
                    return bookdata;
                else {
                    return { error: "Booking not Done" }
                }
            }

        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});