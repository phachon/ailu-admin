import {ReactNode} from "react";
import Login from "../pages/login/login";
import ProfileInfo from "../pages/profile/info";
import ProfileRepass from "../pages/profile/repass";
import AccountAdd from "../pages/account/add";
import AccountList from "../pages/account/list";
import Page404 from "../pages/Page404";
import {LoginTokenStore} from "../store";
import FrameHome from "../pages/frame/home";

function home() {
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
                path: "*", key: "page_404", component: <Page404 />
            }
        ]
    }
]

export default AdminRouters