const express = require('express'),
 morgan = require('morgan');

const app = express();

// log all requests
app.use(morgan('common'));


// Movies
let topMovies = [
    {
        title: 'Scream',
        year: '1996'
    },
    {
        title: 'Practical Magic',
        year: '1998'
    },
    {
        title: 'I Know What You Did Last Summer',
        year: '1997'
    },
    {
        title: 'Halloween',
        year: '1978'
    },
    {
        title: 'A Nightmare on Elm Street',
        year: '1984'
    },
    {
        title: 'Bodies Bodies Bodies',
        year: '2022'
    },
    {
        title: 'Orphan',
        year: '2009'
    },
    {
        title: 'Vacancy',
        year: '2007'
    },
    {
        title: 'The Babysitter',
        year: '2017'
    },
    {
        title: 'Totally Killer',
        year: '2023'
    }
]

// GET request
app.get('/', (req, res) => {
    res.send('Welcome to my movie page!');
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
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