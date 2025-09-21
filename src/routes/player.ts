import { Router } from 'express';
import {
  handleGetAllPlayers,
  handleGetPlayerById,
  handleCreatePlayer,
  handleSpin
} from '../controllers/player.controller';

const router = Router();

router.get('/', handleGetAllPlayers);
router.get('/:id', handleGetPlayerById);
router.post('/', handleCreatePlayer);
router.post('/:id/spin', handleSpin);

export default router;