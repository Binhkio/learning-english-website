import axios from 'axios';

const AUTH_URL = 'http://127.0.0.1:3031/auth';

const axiosInstance = axios.create({
  baseURL: AUTH_URL,
});

const register = (payload) => {
  const registerUrl = `${AUTH_URL}/register`;
  return axiosInstance.post(registerUrl, payload);
};

const login = (payload) => {
  const loginUrl = `${AUTH_URL}/login`;
  return axiosInstance.post(loginUrl, payload);
};

const authApi = {
  register,
  login
};

export default authApi;
