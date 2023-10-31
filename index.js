const express = require('express'),
 morgan = require('morgan'),
 bodyParser = require('body-parser'),
 uuid = require('uuid');
const app = express();

app.use(bodyParser.json()); //any time using req.body, the data will be expected to be in JSON format

// log all requests
app.use(morgan('common'));

// Users
let users = []

// Movies
let topMovies = [
    {
        title: 'Scream',
        year: '1996',
        genre: {
            genreName: 'Horror',
            description: 'Horror is a film genre that seeks to elicit fear or disgust in its audience for entertainment purposes.'
        }
    },
    {
        title: 'Practical Magic',
        year: '1998',
        genre: {
            genreName: 'Fantasy',
            description: 'Fantasy is a genre of speculative fiction involving magical elements, typically set in a fictional universe and usually inspired by mythology or folklore.'
        }
    },
    {
        title: 'I Know What You Did Last Summer',
        year: '1997',
        genre: {
            genreName: 'Horror',
            description: 'Horror is a film genre that seeks to elicit fear or disgust in its audience for entertainment purposes.'
        }
    },
    {
        title: 'Halloween',
        year: '1978',
        genre: {
            genreName: 'Horror',
            description: 'Horror is a film genre that seeks to elicit fear or disgust in its audience for entertainment purposes.'
        }
    },
    {
        title: 'A Nightmare on Elm Street',
        year: '1984',
        genre: {
            genreName: 'Horror',
            description: 'Horror is a film genre that seeks to elicit fear or disgust in its audience for entertainment purposes.'
        }
    },
    {
        title: 'Bodies Bodies Bodies',
        year: '2022',
        genre: {
            genreName: 'Comedy Horror',
            description: 'Comedy horror is a literary, television, and film genre that combines elements of comedy and horror fiction.'
        } 
    },
    {
        title: 'Orphan',
        year: '2009',
        genre: {
            genreName: 'Horror',
            description: 'Horror is a film genre that seeks to elicit fear or disgust in its audience for entertainment purposes.'
        }
    },
    {
        title: 'Vacancy',
        year: '2007',
        genre: {
            genreName: 'Thriller',
            description: 'Thrillers are characterized and defined by the moods they elicit, giving their audiences heightened feelings of suspense, excitement, surprise, anticipation and anxiety.'
        }
    },
    {
        title: 'The Babysitter',
        year: '2017',
        genre: {
            genreName: 'Comedy Horror',
            description: 'Comedy horror is a literary, television, and film genre that combines elements of comedy and horror fiction.'
        } 
    },
    {
        title: 'Totally Killer',
        year: '2023',
        genre: {
            genreName: 'Comedy Horror',
            description: 'Comedy horror is a literary, television, and film genre that combines elements of comedy and horror fiction.'
        } 
    }
]

// GET main page
app.get('/', (req, res) => {
    res.send('Welcome to my movie page!');
});

// GET movie list
app.get('/movies', (req, res) => {
    res.status(200).json(topMovies);
});

app.use(express.static('public'));

// error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// listen for request
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
})