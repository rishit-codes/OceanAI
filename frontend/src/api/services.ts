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
