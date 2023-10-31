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
        },
        director: {
            directorName: 'Wes Craven',
            birth: '1939'
        }
    },
    {
        title: 'Practical Magic',
        year: '1998',
        genre: {
            genreName: 'Fantasy',
            description: 'Fantasy is a genre of speculative fiction involving magical elements, typically set in a fictional universe and usually inspired by mythology or folklore.'
        },
        director: {
            directorName: 'Griffin Dunne',
            birth: '1955'
        }
    },
    {
        title: 'I Know What You Did Last Summer',
        year: '1997',
        genre: {
            genreName: 'Horror',
            description: 'Horror is a film genre that seeks to elicit fear or disgust in its audience for entertainment purposes.'
        },
        director: {
            directorName: 'Jim Gillespie',
            birth: ''
        }
    },
    {
        title: 'Halloween',
        year: '1978',
        genre: {
            genreName: 'Horror',
            description: 'Horror is a film genre that seeks to elicit fear or disgust in its audience for entertainment purposes.'
        },
        director: {
            directorName: 'John Carpenter',
            birth: '1948'
        }
    },
    {
        title: 'A Nightmare on Elm Street',
        year: '1984',
        genre: {
            genreName: 'Horror',
            description: 'Horror is a film genre that seeks to elicit fear or disgust in its audience for entertainment purposes.'
        },
        director: {
            directorName: 'Wes Craven',
            birth: '1939'
        }
    },
    {
        title: 'Bodies Bodies Bodies',
        year: '2022',
        genre: {
            genreName: 'Comedy Horror',
            description: 'Comedy horror is a literary, television, and film genre that combines elements of comedy and horror fiction.'
        },
        director: {
            directorName: 'Halina Reijn',
            birth: '1975'
        }
    },
    {
        title: 'Orphan',
        year: '2009',
        genre: {
            genreName: 'Horror',
            description: 'Horror is a film genre that seeks to elicit fear or disgust in its audience for entertainment purposes.'
        },
        director: {
            directorName: 'Jaume Collet-Serra',
            birth: '1974'
        }
    },
    {
        title: 'Vacancy',
        year: '2007',
        genre: {
            genreName: 'Thriller',
            description: 'Thrillers are characterized and defined by the moods they elicit, giving their audiences heightened feelings of suspense, excitement, surprise, anticipation and anxiety.'
        },
        director: {
            directorName: 'Nimród Antal',
            birth: '1973'
        }
    },
    {
        title: 'The Babysitter',
        year: '2017',
        genre: {
            genreName: 'Comedy Horror',
            description: 'Comedy horror is a literary, television, and film genre that combines elements of comedy and horror fiction.'
        },
        director: {
            directorName: 'McG',
            birth: '1968'
        }
    },
    {
        title: 'Totally Killer',
        year: '2023',
        genre: {
            genreName: 'Comedy Horror',
            description: 'Comedy horror is a literary, television, and film genre that combines elements of comedy and horror fiction.'
        },
        director: {
            directorName: 'Nahnatchka Khan',
            birth: '1973'
        }
    }
]

// READ main page
app.get('/', (req, res) => {
    res.send('Welcome to my movie page!');
});

// READ movie list
app.get('/movies', (req, res) => {
    res.status(200).json(topMovies);
});

// READ movie by title
app.get('/movies/:title', (req, res) => {
    const title = req.params.title;
    const movie = topMovies.find( movie => movie.title === title );

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('There is no such movie.')
    }
})

// READ genre by name
app.get('/movies/genre/:genreName', (req, res) => {
    const genreName = req.params.genreName;
    const genre = topMovies.find( movie => movie.genre.genreName === genreName ).genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('There is no such genre.')
    }
})

// READ director by name
app.get('/movies/directors/:directorName', (req, res) => {
    const directorName = req.params.directorName;
    const director = topMovies.find( movie => movie.director.directorName === directorName ).director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('There is no such director.')
    }
})

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