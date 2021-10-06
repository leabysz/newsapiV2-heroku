const axios = require('axios')
const express = require('express');
const schedule = require('node-schedule');

const app = express();

app.all('*', function (req, res, next) {
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
const newsApiSize = '100';
const newsApiKey = '6633de5b30b74366b611995131df0058';

//Array que guarda el resultado de la apicall
let newsData = {
    "status": "ok",
    "totalResults": 4651,
    "articles": [
        {
            "source": {
                "id": "business-insider",
                "name": "Business Insider"
            },
            "author": "ewu@insider.com (Ethan Wu)",
            "title": "Crypto derivatives are 'misunderstood' and have made markets more efficient, says crypto billionaire Sam Bankman-Fried",
            "description": "The FTX CEO emphasized the need for crypto to embrace regulation, a sentiment he also expressed in a recent interview with Insider.",
            "url": "https://markets.businessinsider.com/news/currencies/sam-bankman-fried-crypto-ftx-derivatives-futures-leverage-limits-binance-2021-08",
            "urlToImage": "https://images2.markets.businessinsider.com/612d397b9ef1e50018f8cef9?format=jpeg",
            "publishedAt": "2021-08-30T20:21:53Z",
            "content": "Sam Bankman-Fried co-founded the crypto exchange FTX in 2019.\r\nFTX\r\nFTX CEO Sam Bankman-Fried defended the derivatives market and explained his rationale for slashing leverage on his crypto exchange … [+1780 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Business Wire"
            },
            "author": null,
            "title": "CompoSecure to Present at the 1st Annual Needham Virtual Crypto Conference",
            "description": "SOMERSET, N.J.--(BUSINESS WIRE)-- #BTC--CompoSecure to Present at the 1st Annual Needham Virtual Crypto Conference",
            "url": "https://www.businesswire.com/news/home/20210830005126/en/CompoSecure-to-Present-at-the-1st-Annual-Needham-Virtual-Crypto-Conference",
            "urlToImage": "http://www.businesswire.com/images/bwlogo_square.png",
            "publishedAt": "2021-08-30T20:10:46Z",
            "content": "SOMERSET, N.J.--(BUSINESS WIRE)--CompoSecure Holdings, L.L.C. (CompoSecure), a leading provider of premium financial payment cards and emergent provider of cryptocurrency storage and security solutio… [+10028 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Business Standard"
            },
            "author": "Vildana Hajric & Olga Kharif | Bloomberg",
            "title": "Hottest cryptocurrencies are alternatives to Bitcoin and Ether",
            "description": "Cardano has doubled this month, becoming the third-largest digital asset. Binance Coin is also up. A token named Avalanche has tripled in August",
            "url": "https://www.business-standard.com/article/markets/hottest-cryptocurrencies-are-alternatives-to-bitcoin-and-ether-121083100046_1.html",
            "urlToImage": "https://bsmedia.business-standard.com/_media/bs/img/article/2021-08/31/full/1630353924-4152.jpg",
            "publishedAt": "2021-08-30T20:06:00Z",
            "content": "FOMO remains alive and well in the cryptocurrency world, with lesser-known tokens outperforming again in the wake of recent rallies staged by industry leaders Bitcoin and Ether. \r\nCardano has doubled… [+5018 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Letstalkbitcoin.com"
            },
            "author": "adam@letstalkbitcoin.com (The LTB Network), The LTB Network",
            "title": "Meet the Taco Plebs - Being Optimistic About The Future Of Bitcoin with Josef T'tek",
            "description": "Austrian economics is a very common topic of discussion and study within the bitcoin community. Being the base economic theory upon which we find bitcoin resting, it makes sense that understanding this would be a primary lead for someone to get into bitcoin. …",
            "url": "https://letstalkbitcoin.com/blog/post/meet-the-taco-plebs-being-optimistic-about-the-future-bitcoin-josef-tetek?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+TheDailyBitcoinShow+%28Let%27s+Talk+Bitcoin+Network+Feed%29",
            "urlToImage": "https://letstalkbitcoin.com/files/blogs/9879-4d7b7fa4925f30a5c91f03cbc49821c893c94d51ccc12044e52f25f9b238fa5f.jpg",
            "publishedAt": "2021-08-30T20:02:00Z",
            "content": "Click to download audio version\r\nAustrian economics is a very common topic of discussion and study within the bitcoin community. Being the base economic theory upon which we find bitcoin resting, it … [+1202 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "newsBTC"
            },
            "author": "Tony Spilotro",
            "title": "Why Bitcoin Dominance Could Submit To Altcoin Season Several Months Longer",
            "description": "Bitcoin price is struggling to break through resistance at $50,000, and it could partially be altcoins to blame for the weakness. The most recent technical structure on the highest time frames suggests that not only could alts continue to gain against BTC dom…",
            "url": "https://www.newsbtc.com/news/bitcoin/bitcoin-dominance-altcoin-season-2/",
            "urlToImage": "https://www.newsbtc.com/wp-content/uploads/2021/08/bitcoin-dominance-altcoin-season-iStock-1220700914.jpeg",
            "publishedAt": "2021-08-30T20:00:43Z",
            "content": "Bitcoin price is struggling to break through resistance at $50,000, and it could partially be altcoins to blame for the weakness. The most recent technical structure on the highest time frames sugges… [+2944 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Cointelegraph"
            },
            "author": "Cointelegraph By Turner Wright",
            "title": "US Global Investors bought crypto exposure through Grayscale funds",
            "description": "U.S. Global Investors added more than $566,389 worth of shares of Grayscale Bitcoin Trust to three of its eight mutual funds as of June 30.",
            "url": "https://cointelegraph.com/news/us-global-investors-bought-crypto-exposure-through-grayscale-funds",
            "urlToImage": "https://images.cointelegraph.com/images/1200_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjEtMDgvZmE1ODA1OTEtMmU2YS00NTJjLWIyNmUtZGQ2MDBkN2JlNmRmLmpwZw==.jpg",
            "publishedAt": "2021-08-30T19:45:00Z",
            "content": "Texas-based investment manager U.S. Global Investors, which reported $4.6 billion in assets under management as of Q1 2021, has bought exposure to Bitcoin.\r\nAccording to Aug. 30 filings from the U.S.… [+1823 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Yahoo Entertainment"
            },
            "author": "Nicholas Pongratz",
            "title": "Crypto Issuers Need Same Conditions as Other Asset Providers, Says ECB VP",
            "description": "European Central Bank (ECB) Vice President Luis de Guindos believes the same conditions should apply to cryptocurrency issuers as those required of other...",
            "url": "https://finance.yahoo.com/news/crypto-issuers-same-conditions-other-194456336.html",
            "urlToImage": "https://s.yimg.com/uu/api/res/1.2/Mrdg1.1Sljfv7DAthVUpMw--~B/aD03MjA7dz0xMjAwO2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/beincrypto_articles_718/8d3582aa9c94e770cf9f4a05f497353b",
            "publishedAt": "2021-08-30T19:44:56Z",
            "content": "BeInCrypto \r\nEuropean Central Bank (ECB) Vice President Luis de Guindos believes the same conditions should apply to cryptocurrency issuers as those required of other financial asset issuers.\r\nAlthou… [+538 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "newsBTC"
            },
            "author": "Hououin Kyouma",
            "title": "PlanB: S2F Model Predicts Bitcoin To Break $100k By Christmas",
            "description": "PlanB, the popularizer behind the Bitcoin S2F method, says the model predicts BTC will break $100k by this Christmas. The Bitcoin Stock-To-Flow Model According to PlanB on Twitter, the BTC stock-to-flow (or S2F in short) model predicts that the cryptocurrency…",
            "url": "https://www.newsbtc.com/news/bitcoin/planb-s2f-bitcoin-100k-christmas/",
            "urlToImage": "https://www.newsbtc.com/wp-content/uploads/2021/08/chart-860x539.jpg",
            "publishedAt": "2021-08-30T19:00:50Z",
            "content": "PlanB, the popularizer behind the Bitcoin S2F method, says the model predicts BTC will break $100k by this Christmas.\r\nThe Bitcoin Stock-To-Flow Model\r\nAccording to PlanB on Twitter, the BTC stock-to… [+2477 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Bitcoinist"
            },
            "author": "Hououin Kyouma",
            "title": "Bitcoin Dry Powder Accumulates On Exchanges As Stablecoins Exceed $19 Billion",
            "description": "On-chain data shows Bitcoin dry powder has been accumulating on exchanges as stablecoins reserve exceeds $19 billion. Stablecoins Reserve Crosses $19 Billion As pointed out by a CryptoQuant post, exchanges now hold stablecoins worth more than $19 billion. Suc…",
            "url": "https://bitcoinist.com/bitcoin-dry-powder-accumulates-on-exchanges-as-stablecoins-exceed-19-billion/",
            "urlToImage": "https://bitcoinist.com/wp-content/uploads/2021/08/executium-mEPsLeVG8p4-unsplash-scaled.jpg",
            "publishedAt": "2021-08-30T19:00:34Z",
            "content": "On-chain data shows Bitcoin dry powder has been accumulating on exchanges as stablecoins reserve exceeds $19 billion.\r\nStablecoins Reserve Crosses $19 Billion\r\nAs pointed out by a CryptoQuant post, e… [+2640 chars]"
        },
        {
            "source": {
                "id": "independent",
                "name": "Independent"
            },
            "author": "Anthony Cuthbertson",
            "title": "Bitcoin: Twitter founder Jack Dorsey reveals plan to make crypto ‘native currency of the internet’ through TBD",
            "description": "‘While there are many projects to help make the internet more decentralised, our focus is solely on a sound global monetary system for all,’ says TBD chief",
            "url": "https://www.independent.co.uk/life-style/gadgets-and-tech/bitcoin-twitter-jack-dorsey-tbd-crypto-b1911216.html",
            "urlToImage": "https://static.independent.co.uk/2021/08/30/16/bitcoin%20exchange%20tbd%20dorsey.jpg?width=1200&auto=webp&quality=75",
            "publishedAt": "2021-08-30T18:57:39Z",
            "content": "Twitter CEO Jack Dorsey has revealed what he plans to do with his mysterious bitcoin startup TBD.\r\nThe venture, which is a unit of Mr Dorseys payments firm Square, will develop a decentralised exchan… [+1969 chars]"
        }
    ]
};
let port = process.env.PORT || 3000;


app.get("/", (req, res) => {
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
        .then((response) => newsData = response.data)
        .catch((error) => console.log(error));
});

app.listen(port, () => {
    console.log(`app funcionado en el puerto http://localhost:${port}`);
});

