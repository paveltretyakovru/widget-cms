import { join } from 'path';
import { ngExpressEngine, NgSetupOptions } from '@nguniversal/express-engine';

// Routers
import { authRouter  } from './server/auth/auth.router';
import { usersRouter } from './server/users/users.router';
import { pagesRouter } from './server/pages/pages.router';
import { modelsRouter } from './server/models/models.router';
import { imagesRouter } from './server/images/images.router';
import { configsRouter } from './server/configs/conigs.router';
import { documentsRouter } from './server/docuemnts/documents.router';
import { collectionsRouter } from './server/collections/collections.router';
import { registrationRouter } from './server/registration/registration.router';

// Libraires
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';

// Middlewares
import { errorHandler } from './server/shared/helpers/error-handler';
import { jwt } from './server/shared/helpers/jwt';

export const PUBLIC_IMAGE_PATH = join(__dirname, '..', '..' , '..', 'public', 'images');

export function createApi(distPath: string, ngSetupOptions: NgSetupOptions) {
  const api = express();

  // Connecting to the mongodb
  mongoose.connect('mongodb://localhost/cms');
  mongoose.connection.once('open', () => console.log('Подключено к mongodb'));

  // Middlewares
  api.use(bodyParser());

  api.set('view engine', 'html');
  api.set('views', distPath);

  // Angular Express Engine
  api.engine('html', ngExpressEngine(ngSetupOptions));

  // Server public files (for images or other need files)
  api.use('/public/images', express.static(PUBLIC_IMAGE_PATH));

  // Jsonwebtoken middleware
  api.use(jwt());

  // Routes
  api.use('/api/auth', authRouter);
  api.use('/api/pages', pagesRouter);
  api.use('/api/users', usersRouter);
  api.use('/api/models', modelsRouter);
  api.use('/api/images', imagesRouter);
  api.use('/api/configs', configsRouter);
  api.use('/api/documents', documentsRouter);
  api.use('/api/collections', collectionsRouter);
  api.use('/api/registration', registrationRouter);

  // Working with error excetions
  api.use(errorHandler);

  // Server static files from distPath
  api.get('*.*', express.static(distPath));

  // All regular routes use the Universal engine
  api.get('*', (req, res) => res.render('index', { req, res }));

  return api;
}
