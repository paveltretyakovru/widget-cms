import { Config } from './config';

export class ConfigService {
  async getAll() {
    return await Config.find();
  }

  async create(configParams) {
    const config = new Config(configParams);

    await config.save();
    return config;
  }

  async update(id, data) {
    const config = await Config.findById(id);

    if (!config) {
      throw new Error('Config not found!');
    }

    Object.assign(config, data);
    await config.save();

    return config;
  }
}

