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

const updateQuiz = (payload) => {
    const getLessonInfoUrl = `${AUTH_URL}/update`
    return axiosInstance.post(getLessonInfoUrl, payload)
}

const getAllQuizzes = () => {
    const getAllQuizzesUrl = `${AUTH_URL}/get-all`
    return axiosInstance.get(getAllQuizzesUrl)
}

const getQuizInfo = (payload) => {
    const getQuizInfoUrl = `${AUTH_URL}/get-info`
    return axiosInstance.post(getQuizInfoUrl, payload)
}

const deleteQuiz = (payload) => {
    const deleteQuizUrl = `${AUTH_URL}/delete`
    return axiosInstance.post(deleteQuizUrl, payload)
}

const quizApi = {
    createQuiz,
    getAllQuizzes,
    updateQuiz,
    deleteQuiz,
    getQuizInfo,
}

export default quizApi
