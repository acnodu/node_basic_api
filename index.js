//////////////////////////////////////////////////////////////////
// Packages
//
const express = require('express');
const app = express();
//
const routes = require('./routes');
//////////////////////////////////////////////////////////////////

app.use(express.json());
app.use(express.urlencoded({ 
    extended: true 
}));

//////////////////////////////////////////////////////////////////
// Set Headers
//
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
    res.header('Access-Control-Allow-Headers', ['content-type'])

    if( req.method == 'OPTIONS' ){ 
        return res.end()
    }

    next()
})
//////////////////////////////////////////////////////////////////

app.use('/', routes);

app.listen(3000);