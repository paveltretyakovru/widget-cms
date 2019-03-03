import { Router } from 'express';

export const userListRouter = Router();

userListRouter.get('', (req, res) => {
  res.json([{ id: 1 }, { id: 2 }]);
});
