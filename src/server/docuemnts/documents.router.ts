import { Router } from 'express';
import { documentListRouter } from './document-list/document-list.router';
import { documentRouter } from './document/document.router';

export const documentsRouter = Router({ mergeParams: true });

documentsRouter.use('/', documentListRouter);
documentsRouter.use('/:id', documentRouter);
