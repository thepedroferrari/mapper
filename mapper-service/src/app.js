/* @flow */
import express from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';
import routes from './routes';
import DefaultRepository from './repositories/DefaultRepository';

let port: ?number;
if (process.env.NODE_ENV !== 'test') {
    port = process.env.PORT ? Number(process.env.PORT) : 3001;
}

const defaultRepository = new DefaultRepository();

const app = express();
app.use(bodyparser.json());
app.use(cors());

routes(app, defaultRepository, defaultRepository);

app.listen(port);

console.log(`Running on port ${port || 'unknown'}`);

export default app;
