import { Router } from 'express';

import { modelRouter } from './model/model.router';
import { modelListRouter } from './model-list/model-list.router';
import { ModelService } from './model/model.service';

export const modelsRouter = Router({ mergeParams: true });

modelsRouter.use('/', modelListRouter);

// TODO: Created router for the path
modelsRouter.use('/name/:name', (req, res, next) => {
  console.log('[GET]/api/models/name/:name', req.params.name);

  new ModelService().getByName(req.params.name)
    .then((model) => res.json({
      data: model,
      success: true,
      message: 'Model was founed by name',
    })).catch(err => next(err));
});

modelsRouter.use('/:id', modelRouter);
