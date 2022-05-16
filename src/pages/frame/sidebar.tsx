import React from "react";
import {Layout, Menu} from "antd";
import {
    UserOutlined,
    UnorderedListOutlined,
    TeamOutlined,
    AccountBookOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

class FrameSidebar extends React.Component<any, any> {

    render () {
        return (
            <Layout.Sider collapsible collapsedWidth="48px" width="208px" className="admin-sidebar" theme="light">
                <Menu mode="inline" className="admin-sidebar-menu" style={{
                    height: `${document.body.offsetHeight - 96}px`
                }}>
                    <Menu.SubMenu key="sub0" title={
                        <span><AccountBookOutlined />
                            <span>个人中心</span>
                        </span>
                    }>
                        <Menu.Item key="1" icon={<UnorderedListOutlined />}>
                            <Link to="/profile/info">个人信息</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<UnorderedListOutlined />}>
                            <Link to="/profile/repass">修改密码</Link>
                        </Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu key="sub1" title={
                        <span><UserOutlined />
                            <span>账号管理</span>
                        </span>
                    }>
                        <Menu.Item key="3" icon={<UnorderedListOutlined />}><Link to="/account/add"> 添加账号</Link></Menu.Item>
                        <Menu.Item key="4" icon={<UnorderedListOutlined />}><Link to="/account/list"> 账号列表</Link></Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu key="sub2" title={
                        <span><TeamOutlined />
                            <span>角色管理</span>
                        </span>
                    }>
                        <Menu.Item key="6"><UnorderedListOutlined />添加角色</Menu.Item>
                        <Menu.Item key="8"><UnorderedListOutlined />角色列表</Menu.Item>
                    </Menu.SubMenu>
                </Menu>
            </Layout.Sider>
        );
    }
}

export default FrameSidebar