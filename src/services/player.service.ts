import { readPlayers, writePlayers } from '../storage';
import { Player } from '../types';

// The data for the new player, excluding the ID.
type NewPlayerData = Omit<Player, 'id'>;

export const getAllPlayers = async (): Promise<Player[]> => {
  return await readPlayers();
};

export const getPlayerById = async (id: number): Promise<Player | null> => {
  const players = await readPlayers();
  const player = players.find(p => p.id === id);
  return player || null;
};

export const createNewPlayer = async (playerData: NewPlayerData): Promise<Player> => {
  const players = await readPlayers();

  const newPlayer: Player = {
    id: players.length > 0 ? Math.max(...players.map(p => p.id)) + 1 : 1,
    ...playerData,
  };

  players.push(newPlayer);
  await writePlayers(players);
  return newPlayer;
};
