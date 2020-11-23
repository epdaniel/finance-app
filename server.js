// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
// Require Route
const api = require('./routes/routes');

const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://danielep:fAppAdmin%40389@financeappcluster.fu8tv.mongodb.net/finance_app-stg?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Create a new express application named 'app'
const app = express();

// Set our backend port to be either an environment variable or port 5000
const port = process.env.PORT || 5000;

// This application level middleware prints incoming requests to the servers console, useful to see incoming requests
// app.use((req, res, next) => {
//     console.log(`Request_Endpoint: ${req.method} ${req.url}`);
//     next();
// });

// Configure the bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Configure the CORs middleware
app.use(cors());

// Configure app to use route
app.use('/api/v1/', api);

// This middleware informs the express application to serve our compiled React files
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
};

// Catch any bad requests
// app.get('*', (req, res) => {
//     res.status(200).json({
//         msg: 'Catch All'
//     });
// });



(async () => {
    try {
        await client.connect();
        console.log("Connected!");
        //await listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        //await client.close();
    }

    // Configure our server to listen on the port defiend by our port variable
    app.listen(port);

    console.log(`BACK_END_SERVICE_PORT: ${port}`)
})().catch(console.error);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

app.get('/new',(req, res) => {
    console.log("got new ")
    createEntry();
    res.status(200).json({
        msg: 'Catch All'
    });
});

app.get('/get',(req, res) => {
    let result; 
    (async () => {
        result = await getEntriesByDay();
        console.log("in get " + result)
        res.status(200).json(result);
    })();
    console.log("in get2 " + result)
    
});

async function createEntry(){
    let entry = {
        userId: 1,
        timestamp: new Date(),
        amount: 500,
        description : "test2",
        catergory: "cat",
        subCatergory: "subcat"
    }
    const result = await client.db("finance_app").collection("entries").insertOne(entry);
    console.log(`New listing created with the following id: ${result.insertedId}`);
};

async function getEntriesByDay(){
    result = await client.db("finance_app").collection("entries")
                        .findOne({ description: "test2" });

    if (result) {
        console.log(result);
        return result;
    } else {
        console.log(`No listings found with the name`);
    }

}