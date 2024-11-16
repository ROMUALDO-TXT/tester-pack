import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response): void => {
    res.json({ message: 'Rota de exemplo funcionando!' });
});

export default router;
