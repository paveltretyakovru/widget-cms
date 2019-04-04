import { Router } from 'express';
import { DocumentService } from '../document/document.service';

export const documentListRouter = Router({ mergeParams: true });

documentListRouter.post('', (req, res, next) => {
  new DocumentService()
    .create(req.body)
      .then((document) => res.json({
        data: document,
        success: true,
        message: 'Document created',
      })).catch((err) => next(err));
});

documentListRouter.get('', (req, res, next) => {
  new DocumentService()
    .getAll()
      .then((documents) => res.json({
        data: documents,
        success: true,
        message: 'Documents fetched success',
      })).catch(err => next(err));
});
