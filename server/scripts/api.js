const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');


const omdbKey = "4ed379e5";
const tmdbKey = "f99337363372bcdf48f6688570ad3894";
let tmdbURL = 'https://api.themoviedb.org/3';

let allGenres = {};


async function getTrending() {
    let url = tmdbURL + '/trending/movie/day?api_key=' + tmdbKey;

    let response = await axios(url);
    let data = response.data.results;

    data = modifyObjects(data);    

    return data;
}

async function getMovieByTitle(title) {
    let url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${title}`;
    let response = await axios.get(url);
    let data = response.data
    

    return data;
}

async function getTrailer(movie_id) {
    let url = `${tmdbURL}/movie/${movie_id}/videos?api_key=${tmdbKey}` 
    let response = await axios.get(url);
    let data = response.data;

    return data;
}

async function loadGenres() {
    
    fs.readFile('genres.json', (err, data) => {
        if(err) return console.log(err)

        allGenres = JSON.parse(data)
        
    })
    
}


/*
    opts = {
        year: {from: 2015, to: 2020},
        rating: {from: 4, to: 5},
        genres: {include: ["Action"], exclude: ["Drama"]}
    }
*/
async function discoverMovies(opts) {
    let url = `${tmdbURL}/discover/movie?api_key=${tmdbKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;

    if(opts.year) {
        if(opts.year.from) {
            url += `&release_date.gte=${opts.year.from}-01-01`
        }
        if(opts.year.to) {
            url += `&release_date.lte=${opts.year.to}-12-31`
        }
    }
    if(opts.rating) {
        if(opts.rating.from) {
            url += `&vote_average.gte=${opts.rating.from}`
        }
        if(opts.rating.to) {
            url += `&vote_average.lte=${opts.rating.to}`
        }
    }
    if(opts.genres) {
        if(opts.genres.include) {
            url += `&with_genres=`
            opts.genres.include.forEach( genre => {

            })
        }
    }
}

async function searchMovies(title) {
    let url = `${tmdbURL}/search/movie?api_key=${tmdbKey}&include_adult=false&query=${title}`
    let response = await axios.get(url);
    let data = response.data.results;
    
    data = modifyObjects(data);

    
    return data;

}

async function getImdbId(id) {
    let url = `${tmdbURL}/movie/${id}/external_ids?api_key=${tmdbKey}`;
    let response = await axios.get(url);

    return response.data.imdb_id;

}

exports.getTrending = getTrending;
exports.getMovieByTitle = getMovieByTitle;
exports.loadGenres = loadGenres;
exports.getTrailer = getTrailer;
exports.searchMovies = searchMovies;
exports.getImdbId = getImdbId;



async function modifyObjects(arr) {
    let filter;
    arr.forEach(movie => {
        if(movie.id === 495764) {
            filter = movie;
            
        }
        let genres = [];
        movie.genre_ids.forEach(id => {
            genres.push(allGenres[id])
        })
        movie["genres"] = genres;

        movie.poster_path = "https://image.tmdb.org/t/p/original" + movie.poster_path;
    })

    arr = arr.filter(a => a !== filter);
    return arr;
}