import axios from "axios";

const AUTH_URL = 'http://127.0.0.1:3031/lesson';

const axiosInstance = axios.create({
    baseURL: AUTH_URL,
    headers: {
        'authorization': sessionStorage.getItem('token'),
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
})

const getLessonInfor = (payload) => {
    const getLessonInfoUrl = `${AUTH_URL}/get-info`
    return axiosInstance.post(getLessonInfoUrl, payload)
}

const lessonAPi = {
    getLessonInfor
}

export default lessonAPi
