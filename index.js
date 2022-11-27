const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { wakeDyno } = require('heroku-keep-awake');

const db = require('./model');

const app = express();
const PORT = 5000;
const DYNO_URL = 'https://buff-server.herokuapp.com';

var corsOptions = {
    origin: 'chrome-extension://cenjkgkekiebockkofebekbcjnlnkkdb'
}

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// connect to the database
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to the database.');
    })
    .catch(err => {
        console.log('Cannot connect to the database.', err);
        process.exit();
    });

// simple route
app.get('/', function (req, res) {
    res.json({ message: 'Welcome to the BUFF/CSGORoll Pricing Server' });
});

require('./routes/buff.routes')(app);

app.listen(process.env.PORT || PORT, () => {
    wakeDyno(DYNO_URL);
    console.log(`Server running on port ${PORT}.`);
});
