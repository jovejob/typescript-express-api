import { Router } from 'express';
import { handleGetRandomNumber } from '../controllers/random.controller';

const router = Router();

router.get('/', handleGetRandomNumber);

export default router;
