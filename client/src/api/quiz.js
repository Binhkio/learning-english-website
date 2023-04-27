import { axiosInstance } from "api";

const QUIZ_URL = process.env.REACT_APP_API_BASE_URL + `/quiz`;

const createQuiz = (payload) => {
    const getLessonInfoUrl = `${QUIZ_URL}/create`
    const axiosIns = axiosInstance(QUIZ_URL)
    return axiosIns.post(getLessonInfoUrl, payload)
}

const updateQuiz = (payload) => {
    const getLessonInfoUrl = `${QUIZ_URL}/update`
    const axiosIns = axiosInstance(QUIZ_URL)
    return axiosIns.post(getLessonInfoUrl, payload)
}

const getAllQuizzes = () => {
    const getAllQuizzesUrl = `${QUIZ_URL}/get-all`
    const axiosIns = axiosInstance(QUIZ_URL)
    return axiosIns.get(getAllQuizzesUrl)
}

const getQuizInfo = (payload) => {
    const getQuizInfoUrl = `${QUIZ_URL}/get-info`
    const axiosIns = axiosInstance(QUIZ_URL)
    return axiosIns.post(getQuizInfoUrl, payload)
}

const deleteQuiz = (payload) => {
    const deleteQuizUrl = `${QUIZ_URL}/delete`
    const axiosIns = axiosInstance(QUIZ_URL)
    return axiosIns.post(deleteQuizUrl, payload)
}

const quizApi = {
    createQuiz,
    getAllQuizzes,
    updateQuiz,
    deleteQuiz,
    getQuizInfo,
}

export default quizApi
