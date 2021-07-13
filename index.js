const axios = require('axios')
const express = require('express');
const schedule = require('node-schedule');

const app = express();

app.all('*', function(req, res, next) {
    var origin = req.get('origin'); 
    res.header('Access-Control-Allow-Origin', origin);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


//documentacion https://newsapi.org/docs/endpoints/everything
const newsApiRoute = 'https://newsapi.org/v2/everything?';
//para agregar poner OR y usar + en lugar de espacios
const newsApiKeywords = 'Cryptocurrency+OR+Crypto+OR+Bitcoin+OR+HEGIC+OR+Hedget+OR+FinNexus+OR+Auctus+OR+MirrorProtocol+OR+Futureswap+OR+LedgerX';
//Lenguaje word
const newsApiKeyLenguaje = 'en';
//opciones: relevancy, popularity, publishedAt
const newsApiSortBy = 'publishedAt';
//cantidad de articulos, maximo 100
const newsApiSize = '10';
const newsApiKey = '6633de5b30b74366b611995131df0058';

//Array que guarda el resultado de la apicall
let newsData = [];
let port = process.env.PORT || 3000;


app.get("/", (req,res) =>{
    res.send("Hello, World");
});

//hace el trabajo, recibe la llamada del navegador o tercero a mi servidor y devuelve newData
app.get("/newsapi", (req, res) => {
    res.send(newsData);
});

//console.log de la direccion api, en caso de cambios siempre verificar 
//entrando al link de la console log que funcione correctamente
const direcccionAPi = `${newsApiRoute}qInTitle=${newsApiKeywords}&language=${newsApiKeyLenguaje}&sortBy=${newsApiSortBy}&pageSize=${newsApiSize}&apiKey=${newsApiKey}`;
console.log(direcccionAPi);

//realiza un fetch a la api cada 15 minutos. Cambiando por 30, seria cada 30 minutos.
//quitando el primer */, se activara en el minuto N de cada hora. Documentacion schedule-node
const getNewsJob = schedule.scheduleJob('*/15 * * * *', function () {
    console.log('getNewsJob activado, trayendo nuevas noticias')
    axios.get(direcccionAPi)
      .then((response) => newsData=response.data)
      .catch((error) => console.log(error)); 
});

app.listen(port, () =>{
    console.log(`app funcionado en el puerto http://localhost:${port}`);
});

