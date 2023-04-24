import _ from 'lodash'

const setSessionStorage = (userData) => {
    sessionStorage.setItem('userData', JSON.stringify(userData))
}

const getSessionStorage = () => {
    const userData = sessionStorage.getItem('userData')

    if (_.isNil(userData)) return null

    return JSON.parse(userData)
}

const user = {
    getSessionStorage,
    setSessionStorage
}

export default user
