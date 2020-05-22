const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const schemas = require('./db/Schemas');

const api = require('./scripts/api');

let fanFavourites = [];

// env vars
const port = 6969;
const dbUrl = 'mongodb://admin:f3V8TsGQjZj2rgv@cluster0-shard-00-00-xj7al.mongodb.net:27017,cluster0-shard-00-01-xj7al.mongodb.net:27017,cluster0-shard-00-02-xj7al.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';




// Middleware functions
app.use(bodyParser.urlencoded({ extended: true }));
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));


app.get('/getTrending', async (req, res) => {
    let data = await api.getTrending();
    console.log("Sending " + data.length + "  trending movies.")
    
    res.json(data);
})

app.get('/getTrailer', async (req, res) => {
    let id = req.query.id;
    let ytId = await api.getTrailer(id);
    
    res.json({youtubeId: ytId.results[0].key});
})

app.get('/searchMovie', async (req, res) => {
    let query = req.query.query;
    let results = await api.searchMovies(query);


    res.json(results.slice(0, 10));
})

app.get('/imdbID', async (req, res) => {
    let id = req.query.id;
    let result = await api.getImdbId(id);
    console.log(result)

    res.json(result);
})

app.listen(port, async () => {
    // mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
    // mongoose.model('Movies', schema);
    console.log('Database is ready');

    api.loadGenres();
    
    console.log(`Listening on port ${port}`);
});