import axios from "axios";

const LESSON_URL = `${process.env.REACT_APP_API_BASE_URL}/lesson`;

const axiosInstance = axios.create({
    baseURL: LESSON_URL,
    headers: {
        'authorization': sessionStorage.getItem('token'),
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
})

const getLessonInfor = (payload) => {
    const getLessonInfoUrl = `${LESSON_URL}/get-info`
    return axiosInstance.post(getLessonInfoUrl, payload)
}

const deleteLesson = (payload) => {
    const deleteLessonUrl = `${LESSON_URL}/delete`
    return axiosInstance.post(deleteLessonUrl, payload)
}

const lessonAPi = {
    getLessonInfor,
    deleteLesson,
}

export default lessonAPi
