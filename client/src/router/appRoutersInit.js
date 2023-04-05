import FirstPage from '../pages/FirstPage'
import SecondPage from '../pages/SecondPage'

import routers from '../constants/routers.js'

const appRoutersInit = [
    {
        path: routers.FIRST_PAGE,
        component: FirstPage
    },
    {
        path: routers.SECOND_PAGE,
        component: SecondPage
    }
]

export default appRoutersInit
