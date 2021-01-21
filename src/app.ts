import express from 'express';
import * as bodyParser from 'body-parser';
import 'reflect-metadata';
import dotenv from 'dotenv';
import path from 'path';
import session from 'express-session';
import unless from 'express-unless';
import passport from 'passport';
import flash from 'express-flash';
import { connect } from './db/db';
import url from 'url';
import { logAccess } from '../utils/logs/access_log';
import { staticAsset } from '../utils/constant';
import authenRouter from './routers/authen';
import cookieParser from 'cookie-parser';
import { logErrors, errorHandler, clientErrorHandler } from '../utils/handleError/handle';
dotenv.config();

connect();
console.log('db connected');

const app = express();

app.use(session({
  cookie: {
    maxAge: 720000
  },
  resave: true,
  saveUninitialized: false,
  secret: 'my key',
}));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Log access
logAccess.unless = unless;
app.use(logAccess.unless((req: any) => {
  const ext = url.parse(req.originalUrl).pathname.substr(0, 3);
  return staticAsset.some(item => item.indexOf(ext) >= 0);
}));

app.use(cookieParser());

app.use(bodyParser.json({
  limit: '50mb',
  verify(req: any, res, buf, encoding) {
    req.rawBody = buf;
  }
}));

// App setting template engine views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/../views'));

// App setting static assets
app.use(express.static(path.join(__dirname + '/../public')));
app.use(flash());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Accept, Authorization, Origin');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser((user: any, done: any) => {
  done(null, user)
})
passport.deserializeUser((user: any, done: any) => {
  done(null, user)
})

import './config/passport';
import userRoutes from './routers/user';

// route for chat
app.get('/messages', (req, res) => {
  res.render('chat/index');
});

app.use(authenRouter);
app.use('/users', userRoutes)

app.get('/', (req, res) => res.send('Hello World!'));

// error handler
app.use([logErrors, clientErrorHandler, errorHandler]);
app.use((req, res, next) => {
  res.render('errors/error_page', { error: {
    statusCode: '404',
    message: 'page not found'
  } });
});

// Log access
logAccess.unless = unless;
app.use(logAccess.unless((req: any) => {
  const ext = url.parse(req.originalUrl).pathname.substr(0, 3);
  return staticAsset.some(item => item.indexOf(ext) >= 0);
}));

// tslint:disable-next-line:no-var-requires
const http = require("http").Server(app);
// tslint:disable-next-line:no-var-requires
const io = require("socket.io")(http);
import { connectServer } from '../utils/realtime/index'
io.on("connection", connectServer);

export { http };
