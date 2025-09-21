import { Router } from 'express';
import { readPlayers, writePlayers } from '../storage';
import { Player } from '../types';

const router = Router();

// GET all players
router.get('/', async (req, res) => {
  const players = await readPlayers();
  res.json({
    message: 'Successfully retrieved all players.',
    data: players,
  });
});

// GET a single player by ID
router.get('/:id', async (req, res) => {
  const players = await readPlayers();
  const player = players.find(p => p.id === parseInt(req.params.id, 10));

  if (!player) {
    return res.status(404).json({ message: 'Player not found.' });
  }

  res.json({
    message: 'Successfully retrieved player.',
    data: player,
  });
});

// POST a new player
router.post('/', async (req, res) => {
  const { name, balance } = req.body;

  if (!name || typeof balance !== 'number') {
    return res.status(400).json({ message: 'Invalid player data. Name and balance are required.' });
  }

  const players = await readPlayers();
  const newPlayer: Player = {
    id: players.length > 0 ? Math.max(...players.map(p => p.id)) + 1 : 1,
    name,
    balance,
  };

  players.push(newPlayer);
  await writePlayers(players);

  res.status(201).json({
    message: 'Player created successfully.',
    data: newPlayer,
  });
});

export default router;
