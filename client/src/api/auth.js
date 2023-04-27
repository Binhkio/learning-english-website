import { axiosInstance } from 'api';

const AUTH_URL = `${process.env.REACT_APP_API_BASE_URL}/auth`

const register = (payload) => {
  const registerUrl = `${AUTH_URL}/register`;
  const axiosIns = axiosInstance(AUTH_URL)
  return axiosIns.post(registerUrl, payload);
};

const login = (payload) => {
  const loginUrl = `${AUTH_URL}/login`;
  const axiosIns = axiosInstance(AUTH_URL)
  return axiosIns.post(loginUrl, payload);
};

const authApi = {
  register,
  login
};

export default authApi;
