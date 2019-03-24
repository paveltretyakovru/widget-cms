import { Page } from './page';

export class PageService {
  async create(pageData) {
    if (await Page.findOne({name: pageData.name})) {
      throw new Error(`Model with a ${pageData.name} name is exists`);
    }

    const page = new Page(pageData);

    await page.save();
    return page;
  }

  async getAll() {
    return await Page.find();
  }
}
