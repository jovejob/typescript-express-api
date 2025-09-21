import { Request, Response } from 'express';
import * as playerService from '../services/player.service';
import { sendSuccess, sendError } from '../utils/apiResponse';

export const handleGetAllPlayers = async (req: Request, res: Response) => {
  try {
    const players = await playerService.getAllPlayers();
    sendSuccess(res, 200, 'Successfully retrieved all players.', players);
  } catch (error) {
    sendError(res, 500, 'An unexpected error occurred.');
  }
};

export const handleGetPlayerById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const player = await playerService.getPlayerById(id);

    if (!player) {
      return sendError(res, 404, 'Player not found.');
    }

    sendSuccess(res, 200, 'Successfully retrieved player.', player);
  } catch (error) {
    sendError(res, 500, 'An unexpected error occurred.');
  }
};

export const handleCreatePlayer = async (req: Request, res: Response) => {
  try {
    const { name, balance } = req.body;

    if (typeof name !== 'string' || typeof balance !== 'number') {
      return sendError(res, 400, 'Invalid player data. Name (string) and balance (number) are required.');
    }

    const newPlayer = await playerService.createNewPlayer({ name, balance });
    sendSuccess(res, 201, 'Player created successfully.', newPlayer);
  } catch (error) {
    sendError(res, 500, 'An unexpected error occurred.');
  }
};

export const handleSpin = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const result = await playerService.performSpin(id);

    if (!result) {
      return sendError(res, 404, 'Player not found.');
    }

    const message = `Player ${result.updatedPlayer.name} spun a ${result.spinValue}! New balance is ${result.updatedPlayer.balance}.`;
    sendSuccess(res, 200, message, result.updatedPlayer);

  } catch (error) {
    sendError(res, 500, 'An unexpected error occurred during the spin.');
  }
};
