'use strict';

var jwt = require('express-jwt');
var secret = 'ngEurope rocks!';
exports.secretJwt = secret;
exports.jwtCheck = jwt({
    secret: secret,
    credentialsRequired: false
});