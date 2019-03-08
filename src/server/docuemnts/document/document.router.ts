import { Router } from 'express';
import { DocuemntService } from './document.service';

export const documentRouter = Router({ mergeParams: true });

documentRouter.put('', (req, res, next) => {
  console.log('[PUT]/api/documents/', req.params.id);

  new DocuemntService().update(req.params.id, req.body)
    .then((document) => res.json({
      data: document,
      success: true,
      message: 'Document was updated',
    })).catch(err => next(err));
});
