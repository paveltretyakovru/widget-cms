import { Router} from 'express';
import { CollectionService } from '../collection/collection.service';
import { DocumentService } from 'src/server/docuemnts/document/document.service';

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
      data: collection,
      success: true,
      message: 'Collection was created',
      documents: new DocumentService().getByCollectionId(collection._id) || [],
   })).catch(err => next(err));
 });
