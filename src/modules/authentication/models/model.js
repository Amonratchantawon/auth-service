'use strict';

var Model = "User";
exports.model = Model;

// use model
var bcrypt = require('bcrypt');
var validator = require('validator');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var validateLocalStrategyEmail = function (email) {
    return ((this.provider !== 'local' && !this.updated) || validator.isEmail(email));
};


var ModelSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        default: '',
        required: 'Please fill in your first name'
    },
    lastName: {
        type: String,
        trim: true,
        default: '',
        required: 'Please fill in your last name'
    },
    displayName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        default: '',
        validate: [validateLocalStrategyEmail, 'Please fill a valid email address']
    },
    username: {
        type: String,
        unique: 'Username already exists',
        required: 'Please fill in a username',
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        default: ''
    },
    salt: {
        type: String
    },
    profileImageURL: {
        type: String,
        default: 'http://res.cloudinary.com/hflvlav04/image/upload/v1487834187/g3hwyieb7dl7ugdgj3tb.png'
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    roles: {
        type: [{
            type: String,
            enum: ['user', 'shop', 'admin']
        }],
        default: ['user'],
        required: 'Please provide at least one role'
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },
    loginToken: {
        type: String
    },
    loginExpires: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    createby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayName: {
            type: String
        }
    },
    updateby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayName: {
            type: String
        }
    }
});

//hashing a password before saving it to the database
ModelSchema.pre('save', function (next) {
    var user = this;
    var round = 13;
    this.salt = bcrypt.genSaltSync(round);
    bcrypt.hash(user.password, this.salt, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});

mongoose.model(Model, ModelSchema);