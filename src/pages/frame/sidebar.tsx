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
            <Layout.Sider collapsible width="208px" className="admin-sider" theme={"light"}>
                <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
                    <Menu.SubMenu key="sub0" title={
                        <span><AccountBookOutlined />
                            <span>个人中心</span>
                        </span>
                    }>
                        <Menu.Item key="1"><UnorderedListOutlined /> 个人信息 </Menu.Item>
                        <Menu.Item key="2"><UnorderedListOutlined /> 密码修改 </Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu key="sub1" title={
                        <span><UserOutlined />
                            <span>用户管理</span>
                        </span>
                    }>
                        <Menu.Item key="3"><UnorderedListOutlined /><Link to="/user/add"> 添加用户</Link></Menu.Item>
                        <Menu.Item key="4"><UnorderedListOutlined /><Link to="/user/list"> 用户列表</Link></Menu.Item>
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