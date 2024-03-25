import axios from 'axios';
import { BASE_URL, RESPONSE_CODE } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

class BaseAPI {
  constructor(options) {
    const TIMEOUT_NUMBER = 10000;

    this.getTokenAPI = async () => {
      try {
        let userInfo = await AsyncStorage.getItem('userInfo');
        userInfoToken = JSON.parse(userInfo)?.token;
        return userInfoToken
          ? { Authorization: 'Bearer ' + userInfoToken }
          : null;
      } catch (error) {
        return undefined;
      }
    };

    this.axiosInstance = axios.create({
      ...options?.config,
      baseURL: options?.baseURL || BASE_URL,
      headers: {
        ...options?.headers
      },
      timeout: options?.timeout || TIMEOUT_NUMBER
    });

    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        // Handle errors
        if (error.response && error.response.status === 401) {
          await AsyncStorage.removeItem('userInfo');
          router.replace(`/sign-in`);
          return Promise.reject(error);
        }
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
    return;
  }

  async get(url, config) {
    try {
      const token = await this.getTokenAPI();
      const response = await this.axiosInstance.get(url, {
        ...config,
        headers: token
      });
      return this.handleResponseData(response);
    } catch (error) {
      console.log(
        '\u001b[' + 31 + 'm' + '❯❯❯ GET error: ' + '\u001b[0m',
        error?.response?.data ?? error
      );
      console.log('\u001b[' + 31 + 'm' + '╰──────────' + '\u001b[0m');
      return Promise.reject(error);
    }
  }

  async post(url, data, config) {
    try {
      const token = await this.getTokenAPI();
      const response = await this.axiosInstance.post(url, data, {
        ...config,
        headers: token
      });
      return this.handleResponseData(response);
    } catch (error) {
      console.log(
        '\u001b[' + 31 + 'm' + '❯❯❯ POST error:' + '\u001b[0m',
        error?.response?.data ?? error
      );
      return Promise.reject(error);
    }
  }

  async put(url, data, config) {
    try {
      const token = await this.getTokenAPI();
      const response = await this.axiosInstance.put(url, data, {
        ...config,
        headers: token
      });
      return this.handleResponseData(response);
    } catch (error) {
      console.log(
        '\u001b[' + 31 + 'm' + '❯❯❯ PUT error: ' + '\u001b[0m',
        error?.response?.data ?? error
      );
      return Promise.reject(error);
    }
  }

  async delete(url, config) {
    try {
      const token = await this.getTokenAPI();
      const response = await this.axiosInstance.delete(url, {
        ...config,
        headers: token
      });
      return this.handleResponseData(response);
    } catch (error) {
      console.log(
        '\u001b[' + 31 + 'm' + '❯❯❯ DELETE error: ' + '\u001b[0m',
        error?.response?.data ?? error
      );
      return Promise.reject(error);
    }
  }
}

const instanceBaseAPI = new BaseAPI();
export default instanceBaseAPI;
