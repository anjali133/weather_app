

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));  // This is a necessary code for us to be able to start parsing through the body of the post request.

app.get ("/", function(req,res){
res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){

const query = req.body.cityName;
const apiKey  = "4c7366093133b3f53d5cb3193c85a158";
const unit = "metric";

const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
https.get(url, function(response){
  console.log(response.statusCode);

  response.on("data",function(data){
  const weatherData = JSON.parse(data)
  const temp = weatherData.main.temp
  const weatherDescription = weatherData.weather[0].description
  const icon = weatherData.weather[0].icon
  const imageURL = " http://openweathermap.org/img/wn/" + icon + "@2x.png"

res.write("<p>The weather is currently " + weatherDescription + "<p>");
  res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
res.write("<img src =" + imageURL + " > ");
  res.send()       //Remember only one res.send is aloowed to use in JSON.So, that's why we have used multiple re.write .

});
});
})




app.listen(3000,function(){
  console.log("Server is running on port 3000.");
})
