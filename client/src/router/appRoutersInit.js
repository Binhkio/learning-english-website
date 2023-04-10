import routers from '../constants/routers.js'
import Register from '../pages/Register'
import Login from '../pages/Login'

const appRoutersInit = [
    {
        path: routers.REGISTER,
        component: Register
    },
    {
        path: routers.LOGIN,
        component:Login
    },
]

export default appRoutersInit
