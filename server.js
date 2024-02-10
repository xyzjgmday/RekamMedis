const express = require('express');
const bodyParser = require('body-parser');
const initializeDoctors = require("./app/migrate/doctor.migrate");


// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
    initializeDoctors();
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Rekam Medis application."});
});
require('./app/routes/doctor.routes')(app);
require('./app/routes/medical-record.routes')(app);
// listen for requests
app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});
