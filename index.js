const config     = require('config');
const express    = require('express');
const morgan     = require('morgan');
const app        = express();

// Routes
const categories = require('./routes/categories');
const random     = require('./routes/random');
const search     = require('./routes/search');
const beers      = require('./routes/beers');

// Port
let port;


// Environment Debugger
if (app.get('env') === 'development') {    
    app.use(morgan('dev'));
    port = 4000;
} else if (app.get('env') === 'production') {    
    port = process.env.PORT;
}


app.use('/api', function (req, res, next) {
    var allowedOrigins  = ['https://react-beer-library.herokuapp.com', 'http://localhost:3000'];
    var origin          = req.headers.origin;

    if (allowedOrigins.indexOf(origin) > -1) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    console.log(origin);

    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


app.use('/api/categories', categories);
app.use('/api/random', random);
app.use('/api/search', search);
app.use('/api/beers', beers);


app.listen(port, () => console.log(`Server listening on port ${port}...`));


// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Application Key: ' + config.get('key'));
console.log('Application Env: ' + app.get('env'));



/*
    Terminal command to set environment
    export NODE_ENV=production

    Terminal command to set key
    export app_key=1234
*/