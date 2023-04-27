import { axiosInstance } from "api";

const ADMIN_URL = `${process.env.REACT_APP_API_BASE_URL}/admin`;

const getListUser = () => {
    const getListUserUrl = `${ADMIN_URL}/get-list-user`
    const axiosIns = axiosInstance(ADMIN_URL)
    return axiosIns.get(getListUserUrl)
}

const editUserData = (payload) => {
    const editUserDataUrl = `${ADMIN_URL}/edit`
    const axiosIns = axiosInstance(ADMIN_URL)
    return axiosIns.put(editUserDataUrl, payload)
}

const deleteUser = (payload) => {
    const deleteUserUrl = `${ADMIN_URL}/delete-user`
    const axiosIns = axiosInstance(ADMIN_URL)
    return axiosIns.delete(deleteUserUrl, {
        params: payload
    })
}

const adminApi = {
    getListUser,
    editUserData,
    deleteUser
}

export default adminApi
