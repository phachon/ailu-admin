import React from 'react';
import { Layout, Menu, Dropdown, Avatar, Badge } from 'antd';
import { UserOutlined, AccountBookOutlined, GithubOutlined, DownOutlined, EditOutlined, SettingOutlined, LoginOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons';

const { Header } = Layout;

class AdminHeader extends React.Component {
  render () {
    const menu = (
      <Menu>
        <Menu.Item>
          <EditOutlined />个人设置
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <LoginOutlined />退出登录
        </Menu.Item>
      </Menu>
    )

    return (
      <Header className="admin-header">
        <div className="admin-header-left">
          <Menu className="admin-header-menu" theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1"><UserOutlined />我的</Menu.Item>
            <Menu.Item key="2"><AccountBookOutlined />系统</Menu.Item>
          </Menu>
        </div>
        <div className="admin-header-right">
          <div className="mr15">
            <a href=""><GithubOutlined /></a>
          </div>
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              <UserOutlined /> phachon <DownOutlined />
            </a>
          </Dropdown>
        </div>
      </Header >
    );
  }
}

export default AdminHeader;