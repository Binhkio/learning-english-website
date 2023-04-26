import axios from "axios";

const ADMIN_URL = `${process.env.REACT_APP_API_BASE_URL}/admin`;

const axiosInstance = axios.create({
    baseURL: ADMIN_URL,
    headers: {
        'authorization': sessionStorage.getItem('token'),
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
})

const getListUser = () => {
    const getListUserUrl = `${ADMIN_URL}/get-list-user`
    return axiosInstance.get(getListUserUrl)
}

const editUserData = (payload) => {
    const editUserDataUrl = `${ADMIN_URL}/edit`
    return axiosInstance.put(editUserDataUrl, payload)
}

const deleteUser = (payload) => {
    const deleteUserUrl = `${ADMIN_URL}/delete-user`
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
