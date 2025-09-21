import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  res.json({
    message: "Here is a random number!",
    data: randomNumber
  });
});

export default router;
