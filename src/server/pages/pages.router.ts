import { Router } from 'express';
import { pageListRouter } from './page-list/page-list.router';

export const pagesRouter = Router({ mergeParams: true});

pagesRouter.use('', pageListRouter);
