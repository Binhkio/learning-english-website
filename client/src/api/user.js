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

const bookmarkQuiz = (payload) => {
  const bookmarkQuizUrl = `${USER_URL}/bookmark/quiz`;
  return axiosInstance.post(bookmarkQuizUrl, payload);
};

const bookmarkLesson = (payload) => {
  const bookmarkLessonUrl = `${USER_URL}/bookmark/lesson`;
  return axiosInstance.post(bookmarkLessonUrl, payload);
};

const userApi = {
  getCurrentUser,
  bookmarkQuiz,
  bookmarkLesson,
};

export default userApi;
