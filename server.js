'use strict';

const app = require('./src/config/app');

app.listen(3000, function () {
    console.log('Start server');
    console.log('Authen service is running');
});