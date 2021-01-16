// Import dependencies
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv/config');
const app = express();

//--------------------------------------------------------------------------------------------

// Require routers
const entriesRouter = require('./routes/entries')

// Set our backend port to be either an environment variable or port 5000
const port = process.env.PORT || 5000;

// This application level middleware prints incoming requests to the servers console, useful to see incoming requests
app.use((req, res, next) => {
    console.log(`Request_Endpoint: ${req.method} ${req.url}`);
    next();
});

// Configure the bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure the CORs middleware
app.use(cors());

// Entries router
app.use('/entries', entriesRouter);

// This middleware informs the express application to serve our compiled React files
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
};

//--------------------------------------------------------------------------------------------

//Run the server 
(async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("Connectred to MongoDB"));
    } catch (e) {
        console.error(e);
    }
    app.listen(port);
    console.log(`BACK_END_SERVICE_PORT: ${port}`)
})().catch(console.error);