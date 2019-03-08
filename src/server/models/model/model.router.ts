import { Router } from 'express';
import { ModelService } from './model.service';

export const modelRouter = Router({ mergeParams: true });

modelRouter.get('', (req, res, next) => {
  console.log('[GET]/api/models/', req.params.id);

  new ModelService().getById(req.params.id)
    .then((model) => res.json({
      data: model,
      success: true,
      message: 'Model was fetched success',
    })).catch(err => next());
});

modelRouter.put('', (req, res, next) => {
  console.log('[PUT]/api/models/', req.params.id);

  new ModelService().update(req.params.id, req.body)
    .then((model) => res.json({
      data: model,
      success: true,
      message: 'Model was updated',
    })).catch(err => next(err));
});
