import { Router } from 'express';
import { CollectionService } from './collection.service';
import { DocuemntService } from 'src/server/docuemnts/document/document.service';

export const collectionRouter = Router({ mergeParams: true });

collectionRouter.get('', async (req, res, next) => {
  console.log('[GET]/api/collections/', req.params.id);
  const documentService = new DocuemntService();
  const documents = await documentService.getByCollectionId(req.params.id);

  new CollectionService().getById(req.params.id)
    .then((model) => res.json({
      data: { ...model.toObject(), documents },
      success: true,
      message: 'Collection was fetched success',
    })).catch(err => next());
});

collectionRouter.put('', (req, res, next) => {
  console.log('[PUT]/api/collections/', req.params.id);

  new CollectionService().update(req.params.id, req.body)
    .then((model) => res.json({
      data: model,
      success: true,
      message: 'Collection was updated',
    })).catch(err => next(err));
});

collectionRouter.delete('', (req, res, next) => {
  console.log('[DELETE]/api/collections/', req.params.id);

  new CollectionService().deleteById(req.params.id)
    .then((model) => res.json({
      data: model,
      success: true,
      message: 'Collection removed success',
    })).catch(err => next(err));
});
