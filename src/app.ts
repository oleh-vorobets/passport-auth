import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import googleAuthRouter from './routes/social-auth.routes';
import authRouter from './routes/auth.routes';
import profileRouetr from './routes/profile.routes';
import { pgDataSource } from './database/app-data-source';
import cookieSession from 'express-session';
import passport from 'passport';

require('./config/passportSetup');

const app = express();

// Connecting to DB
pgDataSource
    .initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err);
    });

app.set('view engine', 'ejs');

// maxAge = 1 day
app.use(
    cookieSession({
        secret: process.env.SESSION_COOKIE_KEY as string,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
        },
    })
);

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter, googleAuthRouter);
app.use('/profile', profileRouetr);

app.get('/', (req: Request, res: Response) => {
    res.render('home');
});

app.listen(3000, async () => {
    try {
        console.log('App is listening on 3000 Port');
    } catch (err) {
        console.log('Something went wrong: ', err);
    }
});
