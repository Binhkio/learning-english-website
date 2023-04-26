import axios from "axios";

const QUIZ_URL = process.env.REACT_APP_API_BASE_URL + `/quiz`;

const axiosInstance = axios.create({
    baseURL: QUIZ_URL,
    headers: {
        'authorization': sessionStorage.getItem('token'),
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
})

const createQuiz = (payload) => {
    const getLessonInfoUrl = `${QUIZ_URL}/create`
    return axiosInstance.post(getLessonInfoUrl, payload)
}

const updateQuiz = (payload) => {
    const getLessonInfoUrl = `${QUIZ_URL}/update`
    return axiosInstance.post(getLessonInfoUrl, payload)
}

const getAllQuizzes = () => {
    const getAllQuizzesUrl = `${QUIZ_URL}/get-all`
    return axiosInstance.get(getAllQuizzesUrl)
}

const getQuizInfo = (payload) => {
    const getQuizInfoUrl = `${QUIZ_URL}/get-info`
    return axiosInstance.post(getQuizInfoUrl, payload)
}

const deleteQuiz = (payload) => {
    const deleteQuizUrl = `${QUIZ_URL}/delete`
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
