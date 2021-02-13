// Setup empty JS array to act as endpoint for all routes
projectData ={};

// Require Express to run server and routes
const express = require('express');
const app = express();
// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors'); 
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));



// Setup Server
const port = 8000;
const server = app.listen(port, listening);
function listening() {
    console.log(`running on port:${port}`);
};
app.get('/all', (request, response) => {
    response.send(projectData);
    console.log(projectData)  ;
});


app.post('/add', (request, response) => {
    projectData = {
         temp:request.body.temp,
         date:request.body.date,
        humidity:request.body.humidity,
        description:request.body.description,
         content:request.body.content,
    }
    
     response.send(projectData);
     console.log(projectData);
     response.status(200).send({
       sucess: true,
       message: "Data successfully",
       data: projectData
     });
});

