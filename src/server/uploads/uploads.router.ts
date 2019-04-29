import { Router } from 'express';
import * as fileUpload from 'express-fileupload';
import { PUBLIC_FAVICON_PATH, SRC_FAVICON_PATH } from 'src/api';

export const uploadsRouter = Router();

uploadsRouter.use(fileUpload());

uploadsRouter.post('/favicon', async (req, res, next) => {
  console.log('[POST]/api/favicon', req.body);

  try {
    if (!req.files && !req.files.file) {
      throw new Error('File input is empty');
    }

    const file = req.files.file;

    if (file.mimetype.indexOf('x-icon') === -1) {
      throw new Error('Only icon allowed to update favicon');
    }

    await file.mv(SRC_FAVICON_PATH);
    await file.mv(PUBLIC_FAVICON_PATH);

    console.log('Moving icon file to', {
      src: SRC_FAVICON_PATH,
      public: PUBLIC_FAVICON_PATH,
    });

    res.json({
      data: {
        publicPath: PUBLIC_FAVICON_PATH,
        srcPath: SRC_FAVICON_PATH,
      },
      success: true,
      message: 'Favicon was updated success'
    });

  } catch (error) {
    next(error);
  }
})