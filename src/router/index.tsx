import {ReactNode} from "react";
import Login from "../pages/Login/Login";
import ProfileInfo from "../pages/Profile/ProfileInfo";
import ProfileRepass from "../pages/Profile/ProfileRepass";
import AccountAdd from "../pages/Account/AccountAdd";
import AccountList from "../pages/Account/AccountList";
import Error404 from "../pages/Error/Error404";
import FrameHome from "../pages/Frame/FrameHome";
import {LoginTokenStore} from "../store";

function home() :ReactNode {
    if (LoginTokenStore.checkTokenExpire()) {
        return <FrameHome />;
    }
    return <Login />
}

export interface IRouter {
    path: string
    key: string
    component?: ReactNode
    children?: IRouter[]
}

const AdminRouters :IRouter[] = [
    {
        path: "/login",
        key: "login",
        component: <Login />
    },
    {
        path: "/home",
        key: "home",
        component: home()
    },
    {
        path: "/",
        key: "index",
        component: home(),
        children: [
            {
                path: "/profile/info", key: "profile_info", component: <ProfileInfo />
            },
            {
                path: "/profile/repass", key: "profile_repass", component: <ProfileRepass />
            },
            {
                path: "/account/add", key: "account_add", component: <AccountAdd />
            },
            {
                path: "/account/list", key: "account_list", component: <AccountList />
            },
            {
                path: "*", key: "error_404", component: <Error404 />
            }
        ]
    }
]

export default AdminRouters