import User from '../components/system/User'
import Login from '../views/Login'
import Index from '../views/Index'
import NoMatch from '../views/NoMatch'
const routes = [
    {
        path: "/login",
        component: Login
    },
    {
        path: "/",
        component: Index,
        routes: [
            {
                path: "/system/user",
                component: Login
            }
        ]
    },
    {
        path: "*",
        component: NoMatch
    },
];

export default routes