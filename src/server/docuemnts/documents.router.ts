import { Router } from 'express';
import { documentListRouter } from './document-list/document-list.router';
import { documentRouter } from './document/document.router';
import { documentModelListRouter } from './document-model-list/document-model-list.router';

export const documentsRouter = Router({ mergeParams: true });

documentsRouter.use('/', documentListRouter);
documentsRouter.use('/model/:modelId', documentModelListRouter);
documentsRouter.use('/:id', documentRouter);
