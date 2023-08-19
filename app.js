const express = require('express');
const { log } = require('node:console');
const https = require('node:https');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
var temp;
var lat;
var long;
app.get('/', (req, res) => {

    const url = "https://api.openweathermap.org/data/2.5/weather?lat=57&lon=-2.15&appid=09e3d9aba06127fb27dd87eb8c321c53&units=metric";
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp1 = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            console.log(temp1);
            console.log(weatherDescription);
        })
    })    
    res.sendFile(__dirname + '/index.html');
})

app.post('/',(req,res)=>{

    var city = req.body.city;
    
        const url2 = "https://api.openweathermap.org/geo/1.0/direct?q="+ city +"&limit=5&appid=09e3d9aba06127fb27dd87eb8c321c53"
    
    https.get(url2,(resp)=>{
        console.log(resp.statusCode);
        resp.on("data",(data)=>{
            const weatherData = JSON.parse(data);
            console.log(weatherData[0]);
            console.log(temp);
            lat = weatherData[0].lat;
            long = weatherData[0].lon;
            
        })
    })
    console.log("lat is " + lat);
    console.log("lon is " + long);
    const url1 = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid=09e3d9aba06127fb27dd87eb8c321c53&units=metric";

    https.get(url1,function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            console.log(temp);
            console.log(weatherDescription);
            res.write("Temperature is " + temp);
            res.send();
})
        })
    })

    

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})