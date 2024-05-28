import express, { Request, Response } from 'express';
import authRouter from './routes/googleAuthRoutes';
import profileRouetr from './routes/profileRoutes';
import dotenv from 'dotenv';
import { connect } from 'mongoose';
import cookieSession from 'express-session';
import passport from 'passport';

const passportSetup = require('./config/passportSetup');

dotenv.config();

const app = express();

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

app.use('/auth', authRouter);
app.use('/profile', profileRouetr);

app.get('/', (req: Request, res: Response) => {
    res.render('home');
});

app.listen(3000, async () => {
    try {
        await connect(process.env.MONGO_URI as string);
        console.log('App is listening on 3000 Port');
    } catch (err) {
        console.log('Something went wrong: ', err);
    }
});
