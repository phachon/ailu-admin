import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, AccountBookOutlined, VideoCameraOutlined } from '@ant-design/icons';

const { Header } = Layout;

class AdminHeader extends React.Component {
  render () {
    return (
      <Header className="admin-header">
        <Menu className="admin-header-menu" theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1"><UserOutlined />我的</Menu.Item>
          <Menu.Item key="2"><AccountBookOutlined />系统</Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default AdminHeader;