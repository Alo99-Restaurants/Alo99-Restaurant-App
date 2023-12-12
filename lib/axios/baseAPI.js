import axios from 'axios';
import { RESPONSE_CODE } from '../../constants';

class BaseAPI {
  constructor(options) {
    const TIMEOUT_NUMBER = 10000;

    const getTokenAPI = () => {
      // const localStorageItem = localStorage.getItem('accessToken');
      // return localStorageItem ? { Authorization: 'Bearer ' + localStorageItem } : null;
      return null;
    };

    this.axiosInstance = axios.create({
      ...options?.config,
      baseURL: options?.baseURL || process.env.API_URL,
      headers: {
        ...options?.headers,
        ...getTokenAPI(),
      },
      timeout: options?.timeout || TIMEOUT_NUMBER,
    });

    this.axiosInstance.interceptors.response.use(
      (response) => {
        if (response && response.data) {
          return response.data;
        }
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  async handleResponseData(data) {
    if (!!data || data.status === RESPONSE_CODE.SUCCESS) {
      return Promise.resolve(data);
    }
    return Promise.reject(data);
  }

  async get(url, config) {
    try {
      const response = await this.axiosInstance.get(url, config);
      return this.handleResponseData(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async post(url, data, config) {
    try {
      const response = await this.axiosInstance.post(url, data, config);
      console.log('response', response);
      return this.handleResponseData(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async put(url, data, config) {
    try {
      const response = await this.axiosInstance.put(url, data, config);
      return this.handleResponseData(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete(url, config) {
    try {
      const response = await this.axiosInstance.delete(url, config);
      return this.handleResponseData(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

const instanceBaseAPI = new BaseAPI();
export default instanceBaseAPI;
