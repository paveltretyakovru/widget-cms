import { Router } from 'express';

// Routers
import { pageRouter } from './page/page.router';
import { pageListRouter } from './page-list/page-list.router';

export const pagesRouter = Router({ mergeParams: true});

pagesRouter.use('', pageListRouter);
pagesRouter.use('/:id', pageRouter);
