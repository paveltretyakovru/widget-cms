import { Router} from 'express';
import { CollectionService } from '../collection/collection.service';

export const collectionListRouter = Router({ nergeParams: true });

collectionListRouter.get('', (req, res, next) => {
  const service = new CollectionService();

  service.getAll()
    .then(collections => res.json({
      data: collections,
      success: true,
      message: 'Collections list was fetched',
    })).catch(err => next(err));
});

collectionListRouter.post('', (req, res, next) => {
  console.log('[POST]CollectionListRouter with data:', req.body);

  new CollectionService().create(req.body)
    .then((collection) => res.json({
     success: true,
     data: collection,
     message: 'Collection was created',
   })).catch(err => next(err));
 });
