import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { url } from './Url';
import store, { RootState } from '../redux/store';

const axiosClient = axios.create({
  baseURL: url.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const request = async <T = any>(axiosConfig: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  try {
    const state: RootState = store.getState(); 
    const token = state.auth?.user?.token;

    if (token) {
      axiosConfig.headers = {
        ...axiosConfig.headers,
        'Authorization': `Bearer ${token}`,
      };
    }

    const response = await axiosClient.request<T>(axiosConfig);
    return response;
  } catch (error: any) {
    throw error.response || error;
  }
};

export { axiosClient };
export default request;
