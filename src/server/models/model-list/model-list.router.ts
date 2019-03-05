import { Router } from 'express';

import { Model } from '../model/model';
import { ModelService } from '../model/model.service';

export const modelListRouter = Router({ mergeParams: true });

modelListRouter.get('', (req, res, next) => {
  const modelService = new ModelService();
  modelService.getAll()
    .then((models) => res.json({
      data: models,
      success: true,
      message: 'Models data fetched success',
    })).catch(err => next(err));
});

modelListRouter.post('', (req, res, next) => {
 console.log('[POST]ModelRouter with data:', req.body);

 new ModelService().create(req.body)
   .then((model) => res.json({
    success: true,
    data: model,
    message: 'Model was cread',
  })).catch(err => next(err));
});
