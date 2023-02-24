import 'express-async-errors';
import express, {Express, Request, Response} from 'express';
import userRouter from './routes/user';
import BodyParser from 'body-parser';
import toolsRouter from './routes/tools';
import { errorMiddleware } from './middleware/errors';
import "reflect-metadata"
import { AppDataSource } from './data-source';
import * as dotenv from 'dotenv'
dotenv.config()

AppDataSource.initialize().then(() =>{

        const app: Express = express();
        const port = 3001;
        app.use( BodyParser.urlencoded( { extended: false } ) );
        app.use( BodyParser.json() );
        
        app.use("/", userRouter);
        app.use("/tools", toolsRouter);
        app.use(errorMiddleware)
        
        app.listen(port, ()=> {
            console.log(`[Server]: I am running at https://localhost:${port}`);
        });
    }
)

