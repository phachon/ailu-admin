import React, { useEffect, useState } from 'react';
import { Layout, MenuProps, Spin } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { ProfileService } from '../../../services/Profile';
import { ProfileInfoType } from '../../../store/types/profileType';
import { useDispatch } from 'react-redux';
import { DispatchLogoutAction } from '../../../store/actions/adminAction';
import { AccountInfoType } from '../../../store/types/accountType';
import '../component/home.css';
import FrameHeaderUI from '../component/HeaderUI';
import FrameSidebarUI from '../component/SidebarUI';
import FrameBreadcrumbUI from '../component/BreadcrumbUI';
import FrameFooterUI from '../component/FooterUI';
import {
  ProfileOutlined,
  TeamOutlined,
  UnorderedListOutlined,
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { setProfileAccountInfo } from '../../../store/local';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { PrivilegeListItemType, PrivilegeTypeNav } from '../../../store/types/privilegeType';
import DynamicIcon from '../../../components/DynamicIcon/DynamicIcon';

const mockMenuItems: MenuProps['items'] = [
  // {
  //   label: '权限管理',
  //   key: 'privilege',
  //   children: [
  //     {
  //       label: <Link to="/privilege/add">添加权限</Link>,
  //       key: 'privilege-add',
  //       icon: <UnorderedListOutlined />,
  //     },
  //     {
  //       label: <Link to="/privilege/list">权限列表</Link>,
  //       key: 'privilege-list',
  //       icon: <UnorderedListOutlined />,
  //     },
  //   ],
  //   icon: <LockOutlined />,
  // },
];

/**
 * 根据权限列表返回获取导航item列表
 * @param privilegeList 权限列表数据
 * @returns 导航的 item
 */
const getNavItemsByPrivilegeList = (
  privilegeList?: PrivilegeListItemType[]
): MenuProps['items'] => {
  let navItems: MenuProps['items'] = [];
  if (!privilegeList) {
    return navItems;
  }
  privilegeList.forEach(privilegeItem => {
    if (privilegeItem.privilege_info.privilege_type == PrivilegeTypeNav) {
      navItems?.push({
        label: privilegeItem.privilege_info.name,
        key: String(privilegeItem.privilege_info.privilege_id),
        icon: <DynamicIcon name={privilegeItem.privilege_info.icon} />,
      });
    }
  });
  return navItems;
};

/**
 * 根据权限列表获取菜单 item
 * @param privilegeList 权限列表
 * @returns 导航对应的菜单列表
 */
const getMenuItemsByPrivilegeList = (
  privilegeList?: PrivilegeListItemType[]
): MenuProps['items'] => {
  let menuItems: MenuProps['items'] = [];
  if (!privilegeList || privilegeList.length == 0) {
    return undefined;
  }
  privilegeList.forEach(privilegeItem => {
    menuItems?.push({
      label:
        privilegeItem.child_privileges.length > 0 ? (
          privilegeItem.privilege_info.name
        ) : (
          <Link to={privilegeItem.privilege_info.page_router}>
            {privilegeItem.privilege_info.name}
          </Link>
        ),
      key: String(privilegeItem.privilege_info.privilege_id),
      icon: <DynamicIcon name={privilegeItem.privilege_info.icon} />,
      children: getMenuItemsByPrivilegeList(privilegeItem.child_privileges),
    });
  });
  return menuItems;
};

const FrameHome: React.FC = () => {
  const [loginAccountInfo, setLoginAccountInfo] = useState<AccountInfoType>();
  const [privilegeList, setPrivilegeList] = useState<PrivilegeListItemType[]>();
  const [navItems, setNavItems] = useState<MenuProps['items']>([]); // 导航列表
  const [menuItems, setMenuItems] = useState<MenuProps['items']>([]); // 菜单列表

  const dispatch = useDispatch();

  useEffect(() => {
    getProfileInfo();
  }, []);

  /**
   * 登录退出操作
   */
  const logoutCallback = () => {
    DispatchLogoutAction(dispatch, null); // dispatch redux
    window.location.href = '/';
  };

  /**
   * 导航选中切换操作
   */
  const navSelectCallback = (info: any) => {
    const navIdStr = info.key ? info.key : '';
    // 查找导航对应的菜单权限
    let menuPrivileges: PrivilegeListItemType[] = [];
    privilegeList?.forEach(privilegeItem => {
      if (String(privilegeItem.privilege_info.privilege_id) == navIdStr) {
        menuPrivileges = privilegeItem.child_privileges;
      }
    });
    let menuItems = getMenuItemsByPrivilegeList(menuPrivileges);
    setMenuItems(menuItems);
  };

  /**
   * 获取个人资料
   */
  const getProfileInfo = () => {
    ProfileService.getProfileInfo()
      .then((profileInfo: ProfileInfoType) => {
        setProfileAccountInfo(profileInfo.account_info);
        setLoginAccountInfo(profileInfo.account_info);
        setPrivilegeList(profileInfo.privilege_list);
        setPrivilegeNavItems(profileInfo.privilege_list); // 更新导航权限
        setPrivilegeMenusItems(profileInfo.privilege_list); // 更新菜单权限
      })
      .catch(e => {
        console.log('get profile catch: ', e);
      });
  };

  /**
   * 更新导航 item 数据
   * @param privilegeList 权限列表
   */
  const setPrivilegeNavItems = (privilegeList?: PrivilegeListItemType[]) => {
    const navItems = getNavItemsByPrivilegeList(privilegeList);
    setNavItems(navItems);
  };

  /**
   * 更新菜单 item 数据
   * @param privilegeList 权限列表
   */
  const setPrivilegeMenusItems = (privilegeList?: PrivilegeListItemType[]) => {
    if (!privilegeList || privilegeList.length == 0) {
      setMenuItems([]);
      return;
    }
    // 获取第一个导航的默认ID
    let defNavId: bigint | undefined;
    if (privilegeList && privilegeList.length > 0) {
      defNavId = privilegeList[0].privilege_info.privilege_id;
    }
    // 查找导航对应的菜单权限
    let menuPrivileges: PrivilegeListItemType[] = [];
    privilegeList?.forEach(privilegeItem => {
      if (privilegeItem.privilege_info.privilege_id == defNavId) {
        menuPrivileges = privilegeItem.child_privileges;
      }
    });
    let menuItems = getMenuItemsByPrivilegeList(menuPrivileges);
    // todo 测试加上mock
    // menuItems?.push(...mockMenuItems);
    setMenuItems(menuItems);
  };

  return (
    <Layout>
      <FrameHeaderUI
        loginAccountInfo={loginAccountInfo}
        logoutCallback={logoutCallback}
        navItems={navItems}
        navSelectCallback={navSelectCallback}
      />
      <Layout>
        <FrameSidebarUI menuItems={menuItems} />
        <Layout className="admin-main">
          <FrameBreadcrumbUI />
          <Layout.Content className="admin-content">
            <Outlet />
          </Layout.Content>
          <FrameFooterUI />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default FrameHome;
