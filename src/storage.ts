import fs from 'fs/promises';
import path from 'path';
import { Player } from './types';

const dbPath = path.resolve(__dirname, 'data/players.json');

export const readPlayers = async (): Promise<Player[]> => {
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading from database:', error);
    return [];
  }
};

export const writePlayers = async (players: Player[]): Promise<void> => {
  try {
    await fs.writeFile(dbPath, JSON.stringify(players, null, 2));
  } catch (error) {
    console.error('Error writing to database:', error);
  }
};
