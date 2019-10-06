require('app-module-path').addPath(__dirname);

const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');

// import file route
const routeScrap = require('./routes/scrap');

// intialize express app
let app = express();

// parse body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// routing file
app.use(routeScrap);

app.use((req, res, next) => {
    res.status(404).send({
      status: 404,
      message: 'Resource not found'
    });
});

const port = process.env.PORT || config.port || 8013;
app.listen(port, () => console.info(`Server has started on http://127.0.0.1:${port}`));