import { Router } from 'express';

import { modelRouter } from './model/model.router';
import { modelListRouter } from './model-list/model-list.router';

export const modelsRouter = Router({ mergeParams: true });

modelsRouter.use('/', modelListRouter);
modelsRouter.use('/name/:name', modelRouter);
modelsRouter.use('/:id', modelRouter);
