import { Router } from 'express';
import { strategyAuth, strategyRedirect } from '../controllers/auth.controller';

const router = Router();

// Google auth
router.get('/google', strategyAuth('google'));
router.get('/google/redirect', strategyRedirect('google'));

// Apple auth
router.get('/apple', strategyAuth('apple'));
router.get('/apple/redirect', strategyRedirect('apple'));

// Facebook auth
router.get('/facebook', strategyAuth('facebook'));
router.get('/facebook/redirect', strategyRedirect('facebook'));

// LinkedIn auth
router.get('/linkedin', strategyAuth('linkedin'));
router.get('/linkedin/redirect', strategyRedirect('linkedin'));

export default router;
