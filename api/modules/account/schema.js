var mongoose = require('mongoose'),
    validator = require('validator');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Account name is required',
        validate: [

            function (val) {
                return validator.isLength(val, 1);
            },
            'Account name must be at least 1 character long.'
        ]
    },
    type: {
        type: String,
        required: 'Account type is required',
        validate: [

            function (val) {
                return ['Trial', 'Internal', 'Live'].indexOf(val) >= 0;
            },
            'Invalid type.'
        ]
    },
    enabled: {
        type: Boolean
    },
    deleted: {
        type: Boolean,
        select: false
    }
});

exports.schema = schema;
