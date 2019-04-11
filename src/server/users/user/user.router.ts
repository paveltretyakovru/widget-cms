import { Router } from 'express';
import { UserService } from './user.service';

export const userRouter: Router = Router({ mergeParams: true });

userRouter.get('', async(req, res, next) => {
  console.log('[GET]UserRouter, id:', req.params.id);

  new UserService().getById(req.params.id)
    .then((user) => res.json({
      success: true,
      data: user,
      message: 'User founded',
    })).catch(err => next(err));
});
