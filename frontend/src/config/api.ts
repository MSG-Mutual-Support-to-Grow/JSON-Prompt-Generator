// Dynamic API base URL
const getApiBaseUrl = (): string => {
  const envApiUrl = import.meta.env.VITE_API_BASE_URL;
  
  if (envApiUrl) {
    return envApiUrl;
  }
  
  // Fallback for development
  return 'http://localhost:8000';
};

export const API_BASE_URL = getApiBaseUrl();

export const appConfig = {
  apiUrl: API_BASE_URL,
  appName: import.meta.env.VITE_APP_NAME || 'JSON Prompt Generator',
  appDescription: import.meta.env.VITE_APP_DESCRIPTION || 'Transform text into structured JSON prompts'
};
