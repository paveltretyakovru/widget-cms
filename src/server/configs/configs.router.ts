import { Router } from 'express';
import { ConfigService } from './config.service';

// TODO: Create serveral routes to configs like other routers
export const configsRouter = Router();

const configService = new ConfigService();

configsRouter.get('', (req, res, next) => {
  configService.getAll()
    .then((data) => res.json({
      data,
      success: true,
      message: 'Configs fetsched',
    })).catch(err => next(err));
});

configsRouter.post('', (req, res, next) => {
  configService.create(req.body)
    .then((data) => res.json({
      data,
      success: true,
      message: 'Config was created',
    })).catch(err => next(err));
});

configsRouter.put('/:id', (req, res, next) => {
  console.log('[PUT]/api/configs/', req.params.id, req.body);

  configService.update(req.params.id, req.body)
    .then((data) => res.json({
      data,
      success: true,
      message: 'Config was updated',
    })).catch(err => next(err));
});
