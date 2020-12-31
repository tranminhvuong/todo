import express from 'express';
import * as bodyParser from 'body-parser';
import 'reflect-metadata';
import dotenv from 'dotenv';
import path from 'path';
import session from 'express-session';

import { connect } from './db/db'
import { User } from "./db/models/user";
import authenRouter from './routers/authen';
import { getProvinces } from './apis/address';
dotenv.config();

connect();
console.log('db connected');

const app = express();
app.use(session({
  cookie: {},
  resave: true,
  saveUninitialized: false,
  secret: 'my key',
}));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json({
  limit: '50mb',
  verify(req: any, res, buf, encoding) {
    req.rawBody = buf;
  }
}));
// App setting template engine views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/../views'));

app.use(express.static(path.join(__dirname + '/../public')));

import { newUser } from './controllers/user';
app.get('/new_user', newUser);

// route for chat
app.get('/messages', (req, res) => {
  res.render('chat/index');
});

app.use(authenRouter);

app.get('/', (req, res) => res.send('Hello World!'));
export { app };
