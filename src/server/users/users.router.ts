import { Router } from 'express';

import { userListRouter } from './user-list/user-list.router';
import { userRouter } from './user/user.router';

export const usersRouter = Router({ mergeParams: true });

usersRouter.use('/', userListRouter);
usersRouter.use('/:id', userRouter);
