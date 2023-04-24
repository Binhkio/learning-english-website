import axios from 'axios';

const AUTH_URL = 'http://127.0.0.1:3031/user';

const axiosInstance = axios.create({
  baseURL: AUTH_URL,
  headers: {
    authorization: sessionStorage.getItem('token'),
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const getCurrentUser = (payload) => {
  const getCurrentUserUrl = `${AUTH_URL}/user-data`;
  return axiosInstance.post(getCurrentUserUrl, payload);
};

const userApi = {
  getCurrentUser,
};

export default userApi;
