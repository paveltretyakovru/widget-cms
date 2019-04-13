import * as fs from 'fs';
import { Image } from './image';
import { PUBLIC_IMAGE_PATH } from 'src/api';
import { promisify } from 'util';

// Promises fs functions to await methods
const stat = promisify(fs.stat);
const unlink = promisify(fs.unlink);

const SHORT_PUBLIC_IMAGE_PATH = '/public/images';

export class ImageService {
  async getById(_id) {
    return await Image.findById(_id);
  }

  async create(imageContent) {
    const image = new Image(imageContent);

    await image.save();
    return image;
  }

  async update(id, content) {
    const image = await Image.findById(id);

    if (!image) {
      throw new Error('Image not founded');
    }

    Object.assign(image, content);
    await image.save();

    return image;
  }

  async upload(file) {
    if (file.mimetype.indexOf('image') === -1) {
      throw new Error('Only image allowed');
    }

    // Prepare file information to uploading
    const extension = file.name.split('.').pop();
    const randomName = `${Math.random().toString(36).substring(2)}.${extension}`;
    const publicName = `${SHORT_PUBLIC_IMAGE_PATH}/${randomName}`;
    const uploadFile = PUBLIC_IMAGE_PATH + '/' + randomName;

    await file.mv(uploadFile);

    return publicName;
  }

  async deleteById(_id) {
    const image = await this.getById(_id);
    const url = (image && image.url) ? image.url : null;

    // If is local file image path or not some oter url path
    if (url && url.indexOf(SHORT_PUBLIC_IMAGE_PATH) === 0) {
      const fileName = url.split('/').pop();
      const filePath = `${PUBLIC_IMAGE_PATH}/${fileName}`;
      const fileStat = await stat(filePath);

      // If file exists
      if (fileStat) {
        // Remove file
        await unlink(filePath);

        // Remove document from images collection
        return Image.deleteOne({ _id });
      }
    }
  }
}
