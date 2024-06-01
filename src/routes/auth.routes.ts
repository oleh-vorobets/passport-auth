import { Request, Response, Router } from 'express';

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

export default router;
