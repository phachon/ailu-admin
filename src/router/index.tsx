import {ReactNode} from "react";
import Login from "../pages/Login";
import ProfileInfo from "../pages/profile/ProfileInfo";
import ProfileRepass from "../pages/profile/ProfileRepass";
import Account from "../pages/Account";
import Error404 from "../pages/error/Error404";
import FrameHome from "../pages/frame/FrameHome";
import {LoginTokenStore} from "../store/local";
import Role from "../pages/Role";

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
                path: "/account/add", key: "account_add", component: <Account.AccountAdd />
            },
            {
                path: "/account/list", key: "account_list", component: <Account.AccountList />
            },
            {
                path: "/role/add", key: "role_add", component: <Role.RoleAdd />
            },
            {
                path: "/role/list", key: "role_list", component: <Role.RoleList />
            },
            {
                path: "*", key: "error_404", component: <Error404 />
            }
        ]
    }
]

export default AdminRouters