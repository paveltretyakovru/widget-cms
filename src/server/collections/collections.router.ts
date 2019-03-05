import { Router } from 'express';
import { collectionListRouter } from './collection-list/collection-list.router';
import { collectionRouter } from './collection/collection.router';

export const collectionsRouter = Router({ mergeParams: true });

collectionsRouter.use('', collectionListRouter);
collectionsRouter.use('/:id', collectionRouter);
