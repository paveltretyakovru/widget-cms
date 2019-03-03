import config from './config.json';

const env = process.env.NODE_ENV || 'development';
const envConfig = config[env];
const defaultConfig = config.development;

export default { ...defaultConfig, ...envConfig };