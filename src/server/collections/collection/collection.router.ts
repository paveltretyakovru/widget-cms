import { Router } from 'express';
import { CollectionService } from './collection.service';

export const collectionRouter = Router({ mergeParams: true });

collectionRouter.get('', (req, res, next) => {
  console.log('[GET]/api/models/', req.params.id);

  new CollectionService().getById(req.params.id)
    .then((model) => res.json({
      data: model,
      success: true,
      message: 'Collection was fetched success',
    })).catch(err => next());
});

collectionRouter.put('', (req, res, next) => {
  console.log('[PUT]/api/models/', req.params.id);

  new CollectionService().update(req.params.id, req.body)
    .then((model) => res.json({
      data: model,
      success: true,
      message: 'Collection was updated',
    })).catch(err => next(err));
});
