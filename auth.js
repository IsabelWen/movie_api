const jwtSecret = 'your_jwt_secret'; // This has to be the same key used in the JWTStrategy

const jwt = require('jsonwebtoken'),
passport = require('passport');

require('./passport'); // local passport file

let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        subject: user.Username, 
        expiresIn: '7d', // token will expire in 7 days
        algorithm: 'HS256' // algorithm used to “sign” or encode the values of the JWT
    });
}