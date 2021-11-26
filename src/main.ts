import express from 'express';
import cors from 'cors';
import axios from 'axios';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

const port = process.env.PORT || 9999;

app.listen(port, () => console.log(`app rodando na porta ${port}`));
