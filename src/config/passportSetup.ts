import passport from 'passport';
import dotenv from 'dotenv';
import { User } from '../models/userModel';
import { ObjectId } from 'mongoose';
dotenv.config();

// Different Strategies that can be replaced by one library passport-oauth2
// but it's more difficult to config such strategies
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

// import { Strategy as FacebookStrategy } from 'passport-facebook';
// import { Strategy as AppleStrategy } from 'passport-apple';
// import { Strategy as LinkedinStrategy } from 'passport-linkedin-oauth2';

passport.serializeUser((user, done) => {
    done(null, (user as { _id: ObjectId })._id);
});

passport.deserializeUser(async (id: string, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENTID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            callbackURL: '/auth/google/redirect',
        },
        async (accessToken, refreshToken, profileInfo, done) => {
            let user = await User.findOne({ googleId: profileInfo.id });
            if (!user) {
                user = await new User({
                    username: profileInfo.displayName,
                    googleId: profileInfo.id,
                }).save();
            }
            done(null, user);
        }
    )
);

// accessToken - is a token that we are receiving from Google
// profileInfo - info about authenticated user
// profileInfo looks like that:
/*
_json: {
    sub: '10531623740158663771',
    name: 'User',
    given_name: 'Name',
    family_name: 'Surname',
    picture: 'Ptoto URL',
    locale: 'en'
  }
*/
