import { Router } from 'express';
import { DocumentService } from '../document/document.service';

export const documentModelListRouter = Router({ mergeParams: true });

const documentService = new DocumentService();

documentModelListRouter.get('', (req, res, next) => {
  console.log('[GET]/api/documents/model/:modelId', req.params.modelId);

  documentService.getByModelId(req.params.modelId)
    .then((data) => res.json({
      data,
      success: true,
      message: 'Documents was fetched success',
    })).catch(err => next(err));
});
