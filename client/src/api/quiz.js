import axios from "axios";

const AUTH_URL = 'http://127.0.0.1:3031/quiz';

const axiosInstance = axios.create({
    baseURL: AUTH_URL,
    headers: {
        'authorization': sessionStorage.getItem('token'),
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
})

const createQuiz = (payload) => {
    const getLessonInfoUrl = `${AUTH_URL}/create`
    return axiosInstance.post(getLessonInfoUrl, payload)
}

const quizApi = {
    createQuiz
}

export default quizApi
