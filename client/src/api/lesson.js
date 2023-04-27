import { axiosInstance } from "api";

const LESSON_URL = `${process.env.REACT_APP_API_BASE_URL}/lesson`;

const getLessonInfor = (payload) => {
    const getLessonInfoUrl = `${LESSON_URL}/get-info`
    const axiosIns = axiosInstance(LESSON_URL)
    return axiosIns.post(getLessonInfoUrl, payload)
}

const deleteLesson = (payload) => {
    const deleteLessonUrl = `${LESSON_URL}/delete`
    const axiosIns = axiosInstance(LESSON_URL)
    return axiosIns.post(deleteLessonUrl, payload)
}

const lessonAPi = {
    getLessonInfor,
    deleteLesson,
}

export default lessonAPi
