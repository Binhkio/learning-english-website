import axios from "axios";

const AUTH_URL = 'http://127.0.0.1:3031/admin';

const axiosInstance = axios.create({
    baseURL: AUTH_URL,
    headers: {
        'authorization': sessionStorage.getItem('token'),
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
})

const getListUser = () => {
    const getListUserUrl = `${AUTH_URL}/get-list-user`
    return axiosInstance.get(getListUserUrl)
}

const adminApi = {
    getListUser
}

export default adminApi
