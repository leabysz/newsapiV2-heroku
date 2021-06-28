const axios = require('axios')
const express = require('express');
const schedule = require('node-schedule');

const app = express();
const newsApiRoute = 'http://newsapi.org/v2/everything?q=rich&sortBy=publishedAt&apiKey=';
const newsApiKey = '6633de5b30b74366b611995131df0058';

let port = process.env.PORT || 3000;

//array que gaurda la apicall
let newsData = [];

app.get("/", (req,res) =>{
    res.send("Hello, World");
});

//hace el trabajo, recibe la llamada del navegador o tercero a mi servidor y devuelve newData
app.get("/newsapi", (req, res) => {
    res.send(newsData);
});

const getNewsJob = schedule.scheduleJob('34 * * * *', function () {
    console.log('Trae las noticias en el minuto N de la hora')
    axios.get(`${newsApiRoute}${newsApiKey}`)
      .then((response) => newsData=response.data)
      .catch((error) => console.log(error)); 
});



app.listen(port, () =>{
    console.log(`example app is listening on port http://localhost:${port}`);
});