import { ReactNode } from 'react';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Account from '../pages/Account';
import Privilege from '../pages/Privilege';
import Error404 from '../pages/Error/Error404';
import FrameHome from '../pages/Frame';
import { LoginTokenStore } from '../store/local';
import Role from '../pages/Role';
import { IRouter } from '../components/Router/View';
import Main from '../pages/Main';
import Log from '../pages/Log';

function home(): ReactNode {
  if (LoginTokenStore.checkTokenExpire()) {
    return <FrameHome />;
  }
  return <Login />;
}

const AdminRouters: IRouter[] = [
  {
    path: '/login',
    key: 'login',
    component: <Login />,
  },
  {
    path: '/home',
    key: 'home',
    component: home(),
  },
  {
    path: '/',
    key: 'index',
    component: home(),
    children: [
      {
        index: true,
        key: 'main_index',
        component: <Main.MainIndex />,
      },
      {
        path: '/profile/info',
        key: 'profile_info',
        component: <Profile.ProfileInfo />,
      },
      {
        path: '/profile/repass',
        key: 'profile_repass',
        component: <Profile.ProfileRepass />,
      },
      {
        path: '/account/add',
        key: 'account_add',
        component: <Account.AccountAdd />,
      },
      {
        path: '/account/list',
        key: 'account_list',
        component: <Account.AccountList />,
      },
      {
        path: '/role/add',
        key: 'role_add',
        component: <Role.RoleAdd />,
      },
      {
        path: '/role/list',
        key: 'role_list',
        component: <Role.RoleList />,
      },
      {
        path: '/privilege/add',
        key: 'privilege_add',
        component: <Privilege.PrivilegeAdd />,
      },
      {
        path: '/privilege/list',
        key: 'privilege_list',
        component: <Privilege.PrivilegeList />,
      },
      {
        path: '/log/list',
        key: 'log_list',
        component: <Log.LogList />,
      },
      {
        path: '*',
        key: 'error_404',
        component: <Error404 />,
      },
    ],
  },
];

export default AdminRouters;
