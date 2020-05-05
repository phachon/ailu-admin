import React from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  UnorderedListOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;
const { SubMenu } = Menu;

class AdminSider extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    }
    this.onCollapse = this.onCollapse.bind(this);
  }

  onCollapse (collapsed) {
    this.setState({ collapsed: collapsed });
    this.props.siderChange(collapsed);
  }

  render () {
    return (
      <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} width="220px" className="admin-sider">
        <div className="admin-header-logo" >
          <a href="/">
            <img src="https://preview.pro.ant.design/static/logo.f0355d39.svg" alt="logo"></img>
            <h1 className={this.state.collapsed ? "hide" : ""}>
              AILU管理系统
            </h1>
          </a>
        </div>
        <Menu theme="dark" mode="inline">
          <SubMenu key="sub1"
            title={
              <span>
                <UserOutlined />
                <span>用户管理</span>
              </span>
            }
          >
            <Menu.Item key="3"><UnorderedListOutlined /><Link to="/user/add"> 添加用户</Link></Menu.Item>
            <Menu.Item key="4"><UnorderedListOutlined /><Link to="/user/list"> 用户列表</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub2"
            title={
              <span>
                <TeamOutlined />
                <span>角色管理</span>
              </span>
            }
          >
            <Menu.Item key="6"><UnorderedListOutlined />添加角色</Menu.Item>
            <Menu.Item key="8"><UnorderedListOutlined />角色列表</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

export default AdminSider;