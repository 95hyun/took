import axios, { AxiosInstance, AxiosError } from 'axios';
import { getTokenFromStorage, clearTokenFromStorage } from '../utils/tokenUtils';

// API 기본 URL 설정
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Axios 인스턴스 생성
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 - 요청에 토큰 추가
api.interceptors.request.use(
  (config) => {
    const token = getTokenFromStorage();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 401 에러 처리
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    // 401 Unauthorized 에러가 발생하면 로그인 페이지로 리다이렉트
    if (error.response?.status === 401) {
      // 리프레시 토큰 로직은 추후 구현
      clearTokenFromStorage();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
