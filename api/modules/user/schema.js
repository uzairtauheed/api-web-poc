var mongoose = require('mongoose'),
    validator = require('validator');

var schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        validate: [
            function (val) {
                return validator.isLength(val, 1);
            },
            'Invalid first name, must be at least 1 character.'
        ]
    },
    lastName: {
        type: String,
        required: true,
        validate: [
            function (val) {
                return validator.isLength(val, 1);
            },
            'Invalid last name, must be at least 1 character.'
        ]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [
            function (val) {
                return validator.isEmail(val);
            },
            'Invalid email.'
        ]
    },
    password: {
        type: String,
        select: false,
        required: true,
        get: function () {
            return 'N/A';
        },
        validate: [
            function (val) {
                return validator.isLength(val, 6);
            },
            'Invalid password, must be at least 6 character long.'
        ]
    },
    token: {
        type: String,
        select: false
    }
});

exports.schema = schema;
