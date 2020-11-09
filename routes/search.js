const request   = require('request');
const express   = require('express');
const router    = express.Router();
const config    = require('config');
const KEY       = config.get('key');


// GET Beer by name
router.get('/', function (req, res) {
    let searchQuery     = req._parsedUrl.query; // outputs q=bud
    let keyCharacter    = '&';

    // console.log('searchQuery:', searchQuery);
    console.log('searchQuery:', searchQuery);

    // use request to make HTTP calls
    request('https://api.brewerydb.com/v2/search?' + searchQuery + keyCharacter + 'key=' + KEY, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            res.send(body);
        }

    });

});

module.exports = router; 