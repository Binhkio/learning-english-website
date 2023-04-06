import FirstPage from '../pages/FirstPage'
import SecondPage from '../pages/SecondPage'

import routers from '../constants/routers.js'
import Register from '../pages/Register'

const appRoutersInit = [{
        path: routers.FIRST_PAGE,
        component: FirstPage
    },
    {
        path: routers.SECOND_PAGE,
        component: SecondPage
    },
    {
        path: routers.REGISTER,
        component: Register
    }
]

export default appRoutersInit