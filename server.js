// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express=require("express");
// Start up an instance of app
const app=express();
/* Middleware*/
const bodyParser=require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors=require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));


// Setup Server

// producing feedback that the server is running to the Command Line through callback function.
const port=3000;
app.listen(port,()=>{
    console.log(`Server is up and running on port:${port}`);
});
//setting up a GET endpoint
app.post("/postprojectdata",(request,response)=>{
//assigning the resceived data to a variable   
const clientData=request.body;
//updating the "projectData" object to contain the received data 
projectData=clientData;



});

//setting up a POST endpoint
app.get("/getprojectdata",(request,response)=>{
//sending the full data to the client side
    response.json(projectData)

});

