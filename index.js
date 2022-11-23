import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import buffRoutes from './routes/buff.js';
import connectDatabase from './config/mongodb.js';

const app = express();
const PORT = 5000;
const API_PREFIX = '/api'

app.use(bodyParser.json());

app.use(cors({ origin: '*' }));

app.use(`${API_PREFIX}/buff`, buffRoutes);

// if user is not logged-in redirect back to login page
app.use(function (req, res) {
    res.redirect(301, '/');
});

connectDatabase();

app.listen(process.env.PORT || PORT, () => console.log(`Server running on: https://localhost:${PORT}`));
