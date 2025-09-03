import apiClient from './client';

// Chat API endpoints
export const chatService = {
  sendMessage: async (message: string) => {
    const response = await apiClient.post('/chat', { message });
    return response.data;
  },
};

// Data API endpoints
export const dataService = {
  getData: async (params: any) => {
    const response = await apiClient.get('/data', { params });
    return response.data;
  },
  getArgoLocations: async () => {
    const response = await apiClient.get('/argo/locations');
    return response.data;
  },
  getDashboardFloats: async () => {
    const response = await apiClient.get('/dashboard/floats');
    return response.data;
  },
  getDashboardMetrics: async () => {
    const response = await apiClient.get('/dashboard/metrics');
    return response.data;
  },
  getDashboardAlerts: async () => {
    const response = await apiClient.get('/dashboard/alerts');
    return response.data;
  },
  getTemperatureSalinityData: async () => {
    const response = await apiClient.get('/charts/temperature-salinity');
    return response.data;
  },
  getHomeStats: async () => {
    const response = await apiClient.get('/home/stats');
    return response.data;
  },
};

// Search API endpoints
export const searchService = {
  search: async (query: string) => {
    const response = await apiClient.get('/search', { params: { query } });
    return response.data;
  },
};

// Voice API endpoints
export const voiceService = {
  processAudio: async (audioData: FormData) => {
    const response = await apiClient.post('/voice', audioData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export { apiClient };
