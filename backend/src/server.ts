import dotenv from 'dotenv';
dotenv.config();


import express from 'express'
import { app_config } from './config/app.config.js'
import bodyParser from 'body-parser';
import { connect } from './db/connect';
import { welcomeRouter } from './app/routes/welcome.routes'
import { userRouter } from './app/routes/user.routes';


const app = express();
const port = process.env.PORT;


app.use(express.static('public'))
app.use(bodyParser.json());

app.use('/', welcomeRouter);
if (app_config.authPerm === 1) app.use('/users', userRouter);


connect();
app.listen(port, () => console.log(`App is listening on port ${port}`))