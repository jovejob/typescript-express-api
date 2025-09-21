import { Router } from 'express';
import {
  handleGetAllPlayers,
  handleGetPlayerById,
  handleCreatePlayer
} from '../controllers/player.controller';

const router = Router();

router.get('/', handleGetAllPlayers);
router.get('/:id', handleGetPlayerById);
router.post('/', handleCreatePlayer);

export default router;




// import { Router } from 'express';
// import { readPlayers, writePlayers } from '../storage';
// import { Player, Api } from '../types';

// const router = Router();

// // GET all players
// router.get('/', async (req, res) => {
//   const players = await readPlayers();

//   const response: Api = {
//     message: 'Successfully retrieved all players.',
//     data: players,
//   };

//   res.json(response);
// });

// // GET a single player by ID
// router.get('/:id', async (req, res) => {
//   const players = await readPlayers();
//   const player = players.find(p => p.id === parseInt(req.params.id, 10));

//   if (!player) {
//     return res.status(404).json({ message: 'Player not found.' });
//   }

//   const response: Api = {
//     message: 'Successfully retrieved player.',
//     data: player,
//   };

//   res.json(response);
// });

// // POST a new player
// router.post('/', async (req, res) => {
//   const { name, balance } = req.body;

//   if (!name || typeof balance !== 'number') {
//     return res.status(400).json({ message: 'Invalid player data. Name and balance are required.' });
//   }

//   const players = await readPlayers();
//   const newPlayer: Player = {
//     id: players.length > 0 ? Math.max(...players.map(p => p.id)) + 1 : 1,
//     name,
//     balance,
//   };

//   players.push(newPlayer);
//   await writePlayers(players);

//   const response: Api = {
//     message: 'Player created successfully.',
//     data: newPlayer,
//   };

//   res.status(201).json(response);
// });

// export default router;

