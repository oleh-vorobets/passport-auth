import passport from 'passport';
import { Providers } from '../types/providers.type';

const authOptions = {
    google: {
        scope: ['profile', 'email'],
    },
    linkedin: {
        scope: ['openid', 'profile', 'email'],
    },
    apple: {
        scope: ['name', 'email'],
    },
    facebook: {
        scope: ['public_profile', 'email'],
    },
};

const redirectOptions = {
    successRedirect: '/profile',
    failureRedirect: '/login',
};

export const strategyAuth = (strategy: Providers) =>
    passport.authenticate(strategy, authOptions[strategy]);

export const strategyRedirect = (strategy: Providers) =>
    passport.authenticate(strategy, redirectOptions);
