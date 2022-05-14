import React from 'react';
import {Menu, Dropdown, Layout, Space} from 'antd';
import {
    UserOutlined,
    AccountBookOutlined,
    GithubOutlined,
    EditOutlined,
    LoginOutlined,
} from '@ant-design/icons';
// @ts-ignore
import logoImg from "../../assets/images/logo_2.png";

class FrameHeader extends React.Component<any, any> {

    render () {
        const menu = (
            <Menu mode="horizontal">
                <Menu.Item><EditOutlined /> 个人设置</Menu.Item>
                <Menu.Divider />
                <Menu.Item><LoginOutlined /> 退出登录</Menu.Item>
            </Menu>
        )

        return (
            <Layout.Header className="admin-header">
                <div className="admin-header-logo" >
                    <a href="/">
                        <img src={logoImg} alt="logo"></img>
                        <span> AiLu Admin </span>
                    </a>
                </div>
                <div className="admin-header-nav">
                    <div className="admin-header-left">
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                            <Menu.Item key="1" icon={<UserOutlined />}>我的</Menu.Item>
                            <Menu.Item key="2" icon={<AccountBookOutlined />}>系统</Menu.Item>
                        </Menu>
                    </div>
                    <div className="admin-header-right">
                        <Menu theme="dark" mode="horizontal">
                            <Menu.Item><GithubOutlined /></Menu.Item>
                        </Menu>
                        <Dropdown overlay={menu} className="admin-header-dropdown">
                            <Menu theme="dark">
                                <Menu.Item icon={<UserOutlined />}>phachon</Menu.Item>
                            </Menu>
                        </Dropdown>
                    </div>
                </div>
            </Layout.Header >
        );
    }
}

export default FrameHeader