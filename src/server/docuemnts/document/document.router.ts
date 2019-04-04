import { Router } from 'express';
import { DocumentService } from './document.service';

export const documentRouter = Router({ mergeParams: true });

documentRouter.put('', (req, res, next) => {
  console.log('[PUT]/api/documents/:id', req.params.id);

  new DocumentService().update(req.params.id, req.body)
    .then((document) => res.json({
      data: document,
      success: true,
      message: 'Document was updated',
    })).catch(err => next(err));
});

documentRouter.delete('', (req, res, next) => {
  console.log('[DELETE]/api/documents/:id', { id: req.params.id });

  new DocumentService().deleteById(req.params.id)
    .then(() => res.json({
      data: {},
      success: true,
      message: 'Document was removed'
    })).catch(err => next(err));
});
