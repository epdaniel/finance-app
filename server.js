// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
// Require Route
const api = require('./routes/routes');

//Mongo code
const db = "finance_app" //STG
const { MongoClient } = require('mongodb');
const { Console } = require('console');
const uri = "mongodb+srv://danielep:fAppAdmin%40389@financeappcluster.fu8tv.mongodb.net/" + db + "?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
// Set our backend port to be either an environment variable or port 5000
const port = process.env.PORT || 5000;

// This application level middleware prints incoming requests to the servers console, useful to see incoming requests
app.use((req, res, next) => {
    console.log(`Request_Endpoint: ${req.method} ${req.url}`);
    next();
});

// Configure the bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Configure the CORs middleware
app.use(cors());

// Configure app to use route
app.use('/', api);

// This middleware informs the express application to serve our compiled React files
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
};

//--------------------------------------------------------------------------------------------

//Runs the server 
(async () => {
    try {
        await client.connect();
        //console.log("DB Connected!");
    } catch (e) {
        console.error(e);
    }
    app.listen(port);
    console.log(`BACK_END_SERVICE_PORT: ${port}`)
})().catch(console.error);

//--------------------------------------------------------------------------------------------

app.post('/entry/new', (req, res) => {
    createEntry();
    res.status(200).json({
        msg: 'Catch All'
    });
});


app.get('/entry/getAll', (req, res) => {
    client.db(db).collection("entries").find({ userId: parseInt(req.headers["id"]) }).toArray().then(result => {
        res.json(result);
    }
    );
});

async function createEntry(id, desc, amount, cat, subcat, time) {
    let entry = {
        userId: id,
        description: desc,
        amount: amount,
        category: cat,
        subCategory: subcat,
        timestamp: time,
    }
    const result = await client.db(db).collection("entries").insertOne(entry);
    //console.log(`New listing created with the following id: ${result.insertedId}`);
};