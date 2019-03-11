import { Router } from 'express';
import { PageService } from '../page/page.service';

export const pageListRouter = Router({ mergeParams: true });

pageListRouter.post('', (req, res, next) => {
  console.log('[POST]PageListROuter with data:', req.body);

  new PageService().create(req.body)
    .then((page) => res.json({
      success: true,
      data: page,
      message: 'Page was cread',
    })).catch(err => next(err));
});
