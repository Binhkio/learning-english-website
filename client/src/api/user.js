import { axiosInstance } from "api";

const USER_URL = `${process.env.REACT_APP_API_BASE_URL}/user`;

const getCurrentUser = (payload) => {
  const getCurrentUserUrl = `${USER_URL}/user-data`;
  const axiosIns = axiosInstance(USER_URL)
  return axiosIns.post(getCurrentUserUrl, payload);
};

const bookmarkQuiz = (payload) => {
  const bookmarkQuizUrl = `${USER_URL}/bookmark/quiz`;
  const axiosIns = axiosInstance(USER_URL)
  return axiosIns.post(bookmarkQuizUrl, payload);
};

const bookmarkLesson = (payload) => {
  const bookmarkLessonUrl = `${USER_URL}/bookmark/lesson`;
  const axiosIns = axiosInstance(USER_URL)
  return axiosIns.post(bookmarkLessonUrl, payload);
};

const userApi = {
  getCurrentUser,
  bookmarkQuiz,
  bookmarkLesson,
};

export default userApi;
