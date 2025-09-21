import express from 'express';
import cors from 'cors';
import playerRoutes from './routes/player';
import randomRoutes from './routes/random';

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my TypeScript Express API!' });
});

app.use('/players', playerRoutes);
app.use('/random', randomRoutes);

export default app;
