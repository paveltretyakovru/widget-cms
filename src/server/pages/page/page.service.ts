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

  async getById(id) {
    return await Page.findById(id);
  }

  async update(id, data) {
    const page = await Page.findById(id);

    if (!page) {
      throw new Error('Collection not found!');
    }

    Object.assign(page, data);
    await page.save();

    return page;
  }

  async deleteById(_id: string) {
    return await Page.deleteOne({ _id });
  }
}
