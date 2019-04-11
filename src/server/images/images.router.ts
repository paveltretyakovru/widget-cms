import { join } from 'path';
import { Router } from 'express';
import * as fileUpload from 'express-fileupload';
import { PUBLIC_IMAGE_PATH } from 'src/api';

export const imagesRouter = Router();

// Applay fileUppload middleware
imagesRouter.use(fileUpload({
  createParentPath: true,
  preserveExtension: true,
}));

// Uploading images route
imagesRouter.post('', (req, res, next) => {
  try {
    if (Object.keys(req.files).length === 0) {
      throw new Error('No files were uploaded');
    }

    if (req.files.file.mimetype.indexOf('image') === -1) {
      throw new Error('Only image allowed');
    }

    // Prepare file information to uploading
    const file = req.files.file;
    const extension = file.name.split('.').pop();
    const randomName = `${Math.random().toString(36).substring(2)}.${extension}`;
    const publicName = `/public/images/${randomName}`;
    const uploadFile = PUBLIC_IMAGE_PATH + '/' + randomName;

    file.mv(uploadFile, (err) => {
      if (err) {
        next(err);
      }

      console.log('File uploaded ============>', uploadFile);
      console.log('Pulib name ============>', publicName);

      res.json({
        data: publicName,
        success: true,
        message: `Image was uploaded`,
      });
    });
  } catch (error) {
    next(error);
  }
});
