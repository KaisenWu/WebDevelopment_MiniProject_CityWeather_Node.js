// Dclare a express framework. (npm install is required.)
const express = require('express');
// https is built-in packege of node.js which is used to fetch data from API.
const https = require('https');
// Get body-parser (npm install is required.)
const bodyParser = require('body-parser');

// Declare server and use parsing url as the request
const app = express();
app.use(bodyParser.urlencoded({extended: true})); 

// Define what the page will render without posting.
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
    // Get the text of the name of input.
    // req.body will return an object of input name and content of the request form.
    const query = req.body.cityName;    
    // Define the apiKey.
    const apiKey = "0752b5dc6ce919fd6bcc42727755b465";
    // Define the URL.
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + 
               query + "&appid=" + apiKey + "&units=metric";

    // Use GET method to fetch respose info from API url.
    https.get(url, function(response) {
        // Get the content of response ("data" cannot be changed).
        // The content will be a decimal format if no JSON parser implements.
        response.on("data", function(data) {
            // Parse the data to JSON format.
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            // Convert a JSON object to a string.
            console.log(    (weatherData));
            // Query the data.
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const iconID = weatherData.weather[0].icon;
            const imgUrl = "http://openweathermap.org/img/wn/" + iconID + "@2x.png"
            res.write("<h1>The temperature in Burnaby is " + temp + " degree Celcius.</h1>");
            res.write("The weather is currently " + description + ".<br>")
            res.write("<img src=" + imgUrl + "></img>"); 
            // After all res.write(), remember to end with res.send().
            res.send();
        })
    
    });
});

app.listen(3000, function() {
    console.log("Server is running on the port 3000.");
})
