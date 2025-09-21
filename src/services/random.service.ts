/**
 * Generates a random integer between 1 and 10 (inclusive).
 */
export const generateRandomNumber = (): number => {
  return Math.floor(Math.random() * 10) + 1;
};
