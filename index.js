const express = require('express');
const bodyParser = require('body-parser');

const db = require('./model');

const app = express();
const PORT = 5000;

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
    console.log(`Server running on port ${PORT}.`);
});
