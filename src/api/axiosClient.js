import axios from 'axios';
import queryString from 'query-string';

export const apiConfig = {
  baseUrl: 'https://api.themoviedb.org/3/',
  apiKey: '50fbc1329ab1e0bc17ffaf32ac34fa4a',
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

const axiosClient = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },

  paramsSerializer: (params) =>
    queryString.stringify({ ...params, api_key: apiConfig.apiKey }),
});

axiosClient.interceptors.request.use(async (config) => config);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },

  (error) => {
    throw error;
  }
);

export default axiosClient;
