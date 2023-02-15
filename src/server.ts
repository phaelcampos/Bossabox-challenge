import express, {Express, Request, Response} from 'express';
import userRouter from './routes/user';
import BodyParser from 'body-parser';

const app: Express = express();
const port = 3001;

app.use( BodyParser.urlencoded( { extended: false } ) );
app.use( BodyParser.json() );

app.use("/", userRouter);

app.listen(port, ()=> {
    console.log(`[Server]: I am running at https://localhost:${port}`);
});