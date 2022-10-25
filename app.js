const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){

  res.sendFile(__dirname + "/index.html");

});

app.use(express.static('fileX'));

app.post("/",function(req,res){
  console.log(req.body.cityName);
  const city = req.body.cityName;
  const key = "d65bee275da7f07165c458a90b3bb9df";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+key+"&units="+unit;

  https.get(url,function(response){

     console.log(response.statusCode);

     response.on("data",function(data){
       const WheatherData = JSON.parse(data);
      console.log("Whether data is : "+ WheatherData);
      const temp = WheatherData.main.temp;
      console.log("Temperature of city is : " + temp);
      const description = WheatherData.weather[0].description;
      console.log("The description of the city is : "+description);
       res.write("<p>The weather condition in "+ req.body.cityName +" is : " + description + ".</p>");
       res.write("<h1>The Temperature in " + req.body.cityName +" is : " + temp +" degree celcius.</h1>");

       const imageCode = WheatherData.weather[0].icon;
       const imgUrl = "http://openweathermap.org/img/wn/"+imageCode+"@2x.png";
       res.write("<img src="+imgUrl+">");
       res.send();
  });
});

});

app.listen(3000,function(){
  console.log("Server is running on port 3000");
});
