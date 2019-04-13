import { Router } from 'express';
import { DocumentService } from 'src/server/docuemnts/document/document.service';
import { PageService } from './page.service';
import { ImageService } from '../../images/image.service';
import { CollectionService } from 'src/server/collections/collection/collection.service';

export const pageRouter = Router({ mergeParams: true });

async function getDocuments(widget, docs, collections, images) {
  if (widget.content) {
    const documentService = new DocumentService();

    const field = widget.content.field;
    if (field && field.documentId) {
      const id = field.documentId;

      if (!docs.find(doc => doc.id === id)) {
        const search = await documentService.getById(id);
        docs.push(search);
        console.log('getDocument', widget);
      }
    }

    const image = widget.content.image;
    if (image) {
      console.log('IMMMAGE ISSETTT ---> ', image);
      const searchImage = await new ImageService().getById(image);

      if (searchImage) {
        images.push(searchImage);
      }
    }

    const collection = widget.content.collection;
    if (collection) {
      const searchCollection = await new CollectionService().getById(collection);

      if (searchCollection) {
        collections.push(searchCollection);
      }

      const collectionDocs = await documentService.getByCollectionId(collection);

      collectionDocs.forEach(colDoc => {
        if (!docs.find(findDoc => findDoc._id === colDoc._id)) {
          docs.push(colDoc);
        }
      });
    }

    const group = widget.content.group;
    if (group) {
      for (let index = 0; index < group.length; index++) {
        const gWidget = group[index];
        await getDocuments(gWidget, docs, collections, images);
      }
    }
  }
}

// TODO: Refactoring methods
pageRouter.get('', async (req, res, next) => {
  console.log('[GET]/api/pages/', req.params.id);
  console.log('additional props:', { document: req.query.document });

  const pageDocument = req.query.document;
  const documentService = new DocumentService();
  const documents = await documentService.getByCollectionId(req.params.id);

  new PageService().getById(req.params.id)
    .then(async (page) => {
      const widgets = page.widgets;
      const docs = [];
      const images = [];
      const collections = [];

      for (let index = 0; index < widgets.length; index++) {
        const widget = widgets[index];
        await getDocuments(widget, docs, collections, images);
      }

      if (pageDocument) {
        if (!docs.find(doc => doc._id === pageDocument)) {
          const document = await documentService.getById(pageDocument);
          docs.push(document);
        }
      }

      res.json({
        data: {
          ...page.toObject(),
          data: { documents: docs, collections, images },
          documents
        },
        success: true,
        message: 'Page was fetched success',
      });
    }).catch(err => next());
});

pageRouter.put('', (req, res, next) => {
  console.log('[PUT]/api/pages/', req.params.id);
  new PageService().update(req.params.id, req.body)
    .then(async (page) => {
      const widgets = page.widgets;
      const docs = [];
      const images = [];
      const collections = [];

      for (let index = 0; index < widgets.length; index++) {
        const widget = widgets[index];
        await getDocuments(widget, docs, collections, images);
      }

      res.json({
        data: {
          ...page.toObject(),
          data: { documents: docs, collections, images },
        },
        success: true,
        message: 'Page was updated',
      });
    }).catch(err => next(err));
});

// TODO: Attach removing connected documents
pageRouter.delete('', (req, res, next) => {
  console.log('[DELETE]/api/pages/', { id: req.params.id } );

  new PageService()
    .deleteById(req.params.id)
    .then((page) => res.json({
      data: page,
      success: true,
      message: 'Page was deleted',
    })).catch(err => next(err));
});
