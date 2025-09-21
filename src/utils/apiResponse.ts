import { Response } from 'express';
import { Api } from '../types';

/**
 * Sends a standardized success response.
 * @param res The Express response object.
 * @param statusCode The HTTP status code.
 * @param message A descriptive message.
 * @param data The payload data.
 */
export const sendSuccess = (res: Response, statusCode: number, message: string, data: unknown) => {
  const response: Api = { message, data };
  res.status(statusCode).json(response);
};

/**
 * Sends a standardized error response.
 * @param res The Express response object.
 * @param statusCode The HTTP status code.
 * @param message A descriptive error message.
 */
export const sendError = (res: Response, statusCode: number, message: string) => {
  res.status(statusCode).json({ message });
};
