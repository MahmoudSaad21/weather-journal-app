// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app

const app = express();
const bodyParser = require('body-parser')


//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
const port = 3030;

// Setup Server
const server = app.listen(port, () => {
    console.log(`running on localhost: ${port}`)
});
app.get("/getInformations", getInformations);
app.post("/saveInformations", saveInformations)
    //functionto get date

function getInformations(req, res) {
    res.send(projectData);
}
//function to save data in the enpoint (projectData)

function saveInformations(req, res) {
    projectData = {...req.body }
    res.end();
}
