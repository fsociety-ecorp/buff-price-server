import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import buffRoutes from './routes/buff.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use(cors({
    origin: '*'
}));

app.use(function (req, res, next) { setTimeout(next, 500) });

app.use('/buff', buffRoutes);

app.listen(PORT, () => console.log(`Server running on: https://localhost:${PORT}`));