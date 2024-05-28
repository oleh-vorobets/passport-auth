import { Request, Response, Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/login', (req: Request, res: Response) => {
    res.render('login');
});

router.get('/logout', (req: Request, res: Response) => {
    req.logout((err) => {
        console.log(err);
    });
    res.redirect('/');
});

// Google auth
router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile'], // you can also receive email and openId
    })
);

// router.get('/facebook', (req: Request, res: Response) => {
//     // handle with passport
//     res.send('Logging with Facebook');
// });

// router.get('/linkedin', (req: Request, res: Response) => {
//     // handle with passport
//     res.send('Logging with Linkedin');
// });

// router.get('/apple', (req: Request, res: Response) => {
//     // handle with passport
//     res.send('Logging with Apple');
// });

// Google redirecting
router.get(
    '/google/redirect',
    passport.authenticate('google'),
    (req: Request, res: Response) => {
        res.redirect('/profile');
    }
);

export default router;
