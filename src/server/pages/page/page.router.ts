import { Router } from 'express';
import { DocuemntService } from 'src/server/docuemnts/document/document.service';
import { PageService } from './page.service';

export const pageRouter = Router({ mergeParams: true });


// TODO: Refactoring methods
pageRouter.get('', async (req, res, next) => {
  console.log('[GET]/api/pages/', req.params.id);
  const documentService = new DocuemntService();
  const documents = await documentService.getByCollectionId(req.params.id);

  new PageService().getById(req.params.id)
    .then(async (page) => {
      const widgets = page.widgets;
      const docs = [];

      async function getDocuments(widget) {
        const field = widget.content.field;
        if (field && field.documentId) {
          const id = field.documentId;
          const search = await documentService.getById(id);
          docs.push(search);
        }

        const group = widget.content.group;
        if (group) {
          getDocuments(group);
        }
      }

      for (let index = 0; index < widgets.length; index++) {
        const widget = widgets[index];
        await getDocuments(widget);
      }

      res.json({
        data: {
          ...page.toObject(),
          data: { documents: docs, collections: [] },
          documents
        },
        success: true,
        message: 'Page was fetched success',
      });
    }).catch(err => next());
});

pageRouter.put('', (req, res, next) => {
  console.log('[PUT]/api/pages/', req.params.id);
  const documentService = new DocuemntService();

  new PageService().update(req.params.id, req.body)
    .then(async (page) => {
      const widgets = page.widgets;
      const docs = [];

      async function getDocuments(widget) {
        const field = widget.content.field;
        if (field && field.documentId) {
          const id = field.documentId;
          const search = await documentService.getById(id);
          docs.push(search);
        }

        const group = widget.content.group;
        if (group) {
          getDocuments(group);
        }
      }

      for (let index = 0; index < widgets.length; index++) {
        const widget = widgets[index];
        await getDocuments(widget);
      }

      res.json({
        data: {
          ...page.toObject(),
          data: { documents: docs, collections: [] }
        },
        success: true,
        message: 'Page was updated',
      });
    }).catch(err => next(err));
});
