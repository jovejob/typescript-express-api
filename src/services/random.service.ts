/**
 * Generates a random integer between 1 and 100 (inclusive).
 */
export const generateRandomNumber = (): number => {
  return Math.floor(Math.random() * 100) + 1;
};
