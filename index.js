const express = require('express'),
 morgan = require('morgan'),
 bodyParser = require('body-parser'),
 uuid = require('uuid'),
 mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json()); //any time using req.body, the data will be expected to be in JSON format

// log all requests
app.use(morgan('common'));

// Require Mongoose models from models.js
const Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;
mongoose.connect('mongodb://127.0.0.1:27017/movieDB', { useNewUrlParser: true, useUnifiedTopology: true });


// CREATE new user [UPDATED]
/* expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post('/users', async (req, res) => {
    await Users.findOne({ Username: req.body.Username})
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.Username + 'already exists');
            } else {
                Users
                    .create({
                        Username: req.body.Username,
                        Password: req.body.Password,
                        Email: req.body.Email,
                        Birthday: req.body.Birthday
                    })
                    .then((user) => { res.status(201).json(user) })
                .catch((error) => {
                    console.error(error);
                    res.status(500).send('Error: ' + error);
                })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

// READ all users [NEW]
app.get('/users', async (req, res) => {
    await Users.find()
        .then((users) => {
            res.status(201).json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// READ a user by username [NEW]
app.get('/users/:Username', async (req, res) => {
    await Users.findOne({ Username: req.params.Username })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// UPDATE user information by username [NEW]
/* expect JSON in this format
{
  Username: String, (required)
  Password: String, (required)
  Email: String, (required)
  Birthday: Date
}*/
app.put('/users/:Username', async (req, res) => {
    await Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
        {
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
        }
    },
    { new: true }) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
        res.json(updatedUser);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    })
});

// UPDATE user information by ID [Need UPDATE]
app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;

    let user = users.find( user => user.id == id );

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('There is no such user')
    }
})

// CREATE new favorite movie for user [UPDATED]
app.post('/users/:Username/movies/:MovieID', async (req, res) => {
    await Users.findOneAndUpdate({ Username: req.params.Username }, {
        $push: { FavoriteMovies: req.params.MovieID }
    },
    { new: true }) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
        res.json(updatedUser);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// DELETE favorite movie for user
app.delete('/users/:id/:movieTitle', (req, res) => {
    const id = req.params.id;
    const movieTitle = req.params.movieTitle;

    let user = users.find( user => user.id == id );


    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
        res.status(200).send(movieTitle + ' has been removed from user ' + id + '\'s array.');
    } else {
        res.status(400).send('There is no such user')
    }
})

// DELETE user by Username [NEW]
app.delete('/users/:Username', async (req, res) => {
    await Users.findOneAndDelete({ Username: req.params.Username })
        .then((user) => {
            if (!user) {
                res.status(400).send(req.params.Username + ' was not found');
            } else {
                res.status(200).send(req.params.Username + ' was deleted.');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status.apply(500).send('Error: ' + err);
        });
});

// DELETE userby ID
app.delete('/users/:id', (req, res) => {
    const id = req.params.id;

    let user = users.find( user => user.id == id );


    if (user) {
        users = users.filter( user => user.id != id);
        res.status(200).send('User ' + id + ' has been deleted.');
    } else {
        res.status(400).send('There is no such user')
    }
})

// READ index page
app.get('/', (req, res) => {
    res.send('Welcome to my movie page!');
});

// READ movie list [UPDATED]
app.get('/movies', async (req, res) => {
    await Movies.find()
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// READ movie by name [UPDATED]
app.get('/movies/:title', async (req, res) => {
    await Movies.findOne({ Name: req.params.Name })
        .then((movie) => {
            res.json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

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