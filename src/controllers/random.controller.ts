import { Request, Response } from 'express';
import { generateRandomNumber } from '../services/random.service';
import { sendSuccess } from '../utils/apiResponse';

export const handleGetRandomNumber = (req: Request, res: Response) => {
  const randomNumber = generateRandomNumber();

  // Use the standardized success response
  sendSuccess(res, 200, 'Successfully generated a random number.', { random: randomNumber });
};

