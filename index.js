import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import buffRoutes from './routes/buff.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use(cors({ origin: '*' }));

app.get('/', (req, res) => res.send('Welcome to BUFF163 Pricing Server'));

app.use('/buff', buffRoutes);

app.listen(process.env.PORT || PORT, () => console.log(`Server running on: https://localhost:${PORT}`));