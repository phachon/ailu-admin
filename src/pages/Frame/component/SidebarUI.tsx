import React from "react";
import {Layout, Menu} from "antd";
import {
    UserOutlined,
    UnorderedListOutlined,
    TeamOutlined,
    AccountBookOutlined,
    ProfileOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

interface FrameSidebarUIProps {

}

const FrameSidebarUI = (props: FrameSidebarUIProps) => {
    return (
        <Layout.Sider
            collapsible
            collapsedWidth="48px"
            width="208px"
            className="admin-sidebar"
            theme="light"
        >
            <Menu
                mode="inline"
                className="admin-sidebar-menu"
                style={{
                    height: `${document.body.offsetHeight - 96}px`
                }}
            >
                <Menu.SubMenu key="profile" title={
                    <span>
                        <ProfileOutlined />
                        <span>个人中心</span>
                    </span>
                }>
                    <Menu.Item key="profile_info" icon={<UnorderedListOutlined />}>
                        <Link to="/profile/info">个人信息</Link>
                    </Menu.Item>
                    <Menu.Item key="profile_repass" icon={<UnorderedListOutlined />}>
                        <Link to="/profile/repass">修改密码</Link>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu key="account" title={
                    <span>
                        <UserOutlined />
                        <span>账号管理</span>
                    </span>
                }>
                    <Menu.Item key="account_add" icon={<UnorderedListOutlined />}><Link to="/account/add">添加账号</Link></Menu.Item>
                    <Menu.Item key="account_list" icon={<UnorderedListOutlined />}><Link to="/account/list">账号列表</Link></Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu key="role" title={
                    <span>
                        <TeamOutlined />
                        <span>角色管理</span>
                    </span>
                }>
                    <Menu.Item key="role_add" icon={<UnorderedListOutlined />}><Link to="/role/add">添加角色</Link></Menu.Item>
                    <Menu.Item key="role_list" icon={<UnorderedListOutlined />}><Link to="/role/list">角色列表</Link></Menu.Item>
                </Menu.SubMenu>
            </Menu>
        </Layout.Sider>
    );
}

export default FrameSidebarUI