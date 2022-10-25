import React, { useEffect, useState } from "react";
import {Layout, MenuProps, Spin} from "antd";
import {Link, Outlet} from "react-router-dom";
import {ProfileService} from "../../../services/Profile";
import {ProfileInfoType} from "../../../store/types/profileType";
import {useDispatch} from "react-redux";
import {DispatchLogoutAction, ProfileAccountUpdateAction} from "../../../store/actions/adminAction";
import {AccountInfoType} from "../../../store/types/accountType";
import '../component/home.css'
import FrameHeaderUI from "../component/HeaderUI";
import FrameSidebarUI from "../component/SidebarUI";
import FrameBreadcrumbUI from "../component/BreadcrumbUI";
import FrameFooterUI from "../component/FooterUI";
import {ProfileOutlined, TeamOutlined, UnorderedListOutlined, UserOutlined, LockOutlined} from "@ant-design/icons";
import { setProfileAccountInfo } from "../../../store/local";

const menuItems: MenuProps['items'] = [
    {
        label: '个人中心',
        key: 'profile',
        children: [
            { label: <Link to="/profile/info">个人信息</Link>, key: 'profile-info',  icon: <UnorderedListOutlined />},
            { label: <Link to="/profile/repass">修改密码</Link>, key: 'profile-repass', icon: <UnorderedListOutlined /> },
        ],
        icon: <ProfileOutlined />,
    },
    {
        label: '账号管理',
        key: 'account',
        children: [
            { label: <Link to="/account/add">添加账号</Link>, key: 'account-add',  icon: <UnorderedListOutlined />},
            { label: <Link to="/account/list">账号列表</Link>, key: 'account-list', icon: <UnorderedListOutlined /> },
        ],
        icon: <UserOutlined />,
    },
    {
        label: '角色管理',
        key: 'role',
        children: [
            { label: <Link to="/role/add">添加角色</Link>, key: 'role-add',  icon: <UnorderedListOutlined />},
            { label: <Link to="/role/list">角色列表</Link>, key: 'role-list', icon: <UnorderedListOutlined /> },
        ],
        icon: <TeamOutlined />,
    },
    {
        label: '权限管理',
        key: 'privilege',
        children: [
            { label: <Link to="/privilege/add">添加权限</Link>, key: 'privilege-add',  icon: <UnorderedListOutlined />},
            { label: <Link to="/privilege/list">权限列表</Link>, key: 'privilege-list', icon: <UnorderedListOutlined /> },
        ],
        icon: <LockOutlined />,
    },
]

const FrameHome: React.FC = () => {

    const [loginAccountInfo, setLoginAccountInfo] = useState<AccountInfoType>()

    const dispatch = useDispatch()

    useEffect(() => {
        getProfileInfo()
    }, [])

    /**
     * 登录退出操作
     */
    const logoutCallback = () => {
        DispatchLogoutAction(dispatch, null) // dispatch redux
        window.location.href = "/"
    }

    /**
     * 获取个人资料
     */
    const getProfileInfo = () => {
        ProfileService.getProfileInfo().then((profileInfo: ProfileInfoType) => {
            setProfileAccountInfo(profileInfo.account_info)
            setLoginAccountInfo(profileInfo.account_info)
        }).catch(e => {
            console.log("get profile catch: ", e)
        })
    }
    return (
        <Layout>
            <FrameHeaderUI
                loginAccountInfo={loginAccountInfo}
                logoutCallback={logoutCallback}
            />
            <Layout>
                <FrameSidebarUI menuItems={menuItems}/>
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
}

export default FrameHome