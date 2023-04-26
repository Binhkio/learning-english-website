import axios from 'axios';

const USER_URL = `${process.env.REACT_APP_API_BASE_URL}/user`;

const axiosInstance = axios.create({
  baseURL: USER_URL,
  headers: {
    authorization: sessionStorage.getItem('token'),
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const getCurrentUser = (payload) => {
  const getCurrentUserUrl = `${USER_URL}/user-data`;
  return axiosInstance.post(getCurrentUserUrl, payload);
};

const userApi = {
  getCurrentUser,
};

export default userApi;
