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

const editUserData = (payload) => {
    const editUserDataUrl = `${AUTH_URL}/edit`
    return axiosInstance.put(editUserDataUrl, payload)
}

const deleteUser = (payload) => {
    const deleteUserUrl = `${AUTH_URL}/delete-user`
    return axiosInstance.delete(deleteUserUrl, {
        params: payload
    })
}

const adminApi = {
    getListUser,
    editUserData,
    deleteUser
}

export default adminApi
