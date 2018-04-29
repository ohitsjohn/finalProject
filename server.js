const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://limn64:cheesebread1@ds161529.mlab.com:61529/easy-notes', (err, client) => {
  if (err) return console.log(err)
  db = client.db('easy-notes')
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/website/index.html')
});

//POST
app.post('/contacts', (req, res) => {
    db.collection('contacts').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('new contact added')
        res.redirect('/')
    })
})

// Require Notes routes
require('./app/routes/note.routes.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});