import passport from 'passport';
import { Providers } from '../types/providers.type';

const authOptions = {
    scope: ['profile', 'email'],
};
const redirectOptions = {
    successRedirect: '/profile',
    failureRedirect: '/login',
};

export const strategyAuth = (strategy: Providers) =>
    passport.authenticate(strategy, authOptions);

export const strategyRedirect = (strategy: Providers) =>
    passport.authenticate(strategy, redirectOptions);
