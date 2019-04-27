import { Router } from 'express';
import * as fileUpload from 'express-fileupload';
import { ImageService } from './image.service';

export const imagesRouter = Router();

const imageService = new ImageService();

// Applay fileUppload middleware
imagesRouter.use(fileUpload({
  createParentPath: true,
  preserveExtension: true,
}));

// Uploading images route
imagesRouter.post('', async (req, res, next) => {
  console.log('[POST]/api/images:', req.body);

  try {
    const { title, url, fieldId, documentId } = req.body;
    const file = (req.files && req.files.file) ? req.files.file : null;

    // If using url to make create image document
    if (url) {
      imageService.create({ title, url })
        .then((image) => res.json({
          data: image,
          success: true,
          message: 'Image was created',
        })).catch(err => next(err));
    }

    // If using document file to create image document
    if (fieldId && documentId) {
      const field = { id: fieldId, documentId: documentId };

      console.log(
        'Using document file to create image document',
        { title, field }
      );

      return imageService.create({ title, field })
        .then((image) => res.json({
          data: image,
          success: true,
          message: 'Image was created',
        })).catch(err => next(err));
    }

    // If using image file to create image document
    if (file) {
      const publicName = await imageService.upload(req.files.file);

      console.log(
        'Using image file to create image document',
        { publicName, title }
      );

      return imageService.create({ title, url: publicName })
        .then((image) => res.json({
          data: image,
          success: true,
          message: 'Image was uploaded',
        })).catch(err => next(err));
    }

    if (!file && !url) {
      throw new Error('Enter image or image url to create image widget');
    }
  } catch (error) {
    next(error);
  }
});

imagesRouter.put('/:id', (req, res, next) => {
  try {
    console.log('[PUT]/api/images:', req.body);

    if (!req.params.id) {
      throw new Error('There is no id to update image');
    }

    imageService.update(req.params.id, req.body)
      .then((image) => res.json({
        data: image,
        success: true,
        message: 'Image was updated',
      })).catch(err => next(err));
  } catch (error) {
    next(error);
  }
});

imagesRouter.delete('/:id', (req, res, next) => {
  try {
    console.log('[DELETE]/api/images:', req.params);

    if (!req.params.id) {
      throw new Error('There is not id to remove image');
    }

    imageService.deleteById(req.params.id)
      .then(() => res.json({
        data: { id: req.params.id },
        success: true,
        message: 'Image was removed'
      })).catch(err => next(err));
  } catch (error) {
    next(error);
  }
});
