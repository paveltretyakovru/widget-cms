import { join } from 'path';
import { Router } from 'express';
import * as fileUpload from 'express-fileupload';
import { PUBLIC_IMAGE_PATH } from 'src/api';

export const imagesRouter = Router();

// Applay fileUppload middleware
imagesRouter.use(fileUpload());

// Uploading images route
imagesRouter.post('', (req, res, next) => {
  try {
    if (Object.keys(req.files).length === 0) {
      throw new Error('No files were uploaded');
    }

    const file = req.files.file;
    const publicName = `/public/images/${file.name}`;
    const uploadFile = PUBLIC_IMAGE_PATH + '/' + file.name;

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
