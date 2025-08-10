// API Configuration for development and production
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001';

// App configuration from environment variables
export const APP_CONFIG = {
  API_BASE_URL,
  APP_NAME: import.meta.env.VITE_APP_NAME || 'JSON Prompt Generator',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  IS_PRODUCTION: import.meta.env.PROD,
  IS_DEVELOPMENT: import.meta.env.DEV,
};

export default API_BASE_URL;
