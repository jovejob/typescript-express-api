import app from './app';
import * as dotenv from 'dotenv';

// Configure dotenv to load variables from .env file
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
