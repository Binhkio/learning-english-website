import authApi from "./auth";
import adminApi from "./admin";
import userApi from "./user";
import lessonAPi from "./lesson";
import quizApi from "./quiz";
import firebaseApi from "./firebase";
import axios from "axios";

export const axiosInstance = (BASE_URL) => axios.create({
    baseURL: BASE_URL,
    headers: {
        'authorization': sessionStorage.getItem('token'),
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
})

const api = {
    authApi,
    adminApi,
    userApi,
    lessonAPi,
    quizApi,
    firebaseApi
}
export default api
