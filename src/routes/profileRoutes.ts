import { NextFunction, Request, Response, Router } from 'express';

const router = Router();

const authCheck = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        res.redirect('/auth/login');
    }
    next();
};

router.get('/', authCheck, (req: Request, res: Response) => {
    // @ts-ignore
    res.render('profile', { user: req.user });
});

export default router;
