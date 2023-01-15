import React from 'react';
import { Menu, Dropdown, Layout, Space, MenuProps } from 'antd';
import {
  UserOutlined,
  GithubOutlined,
  LoginOutlined,
  ProfileOutlined,
  LockOutlined,
} from '@ant-design/icons';
// @ts-ignore
import logoImg from '../../../assets/images/logo_2.png';
import { Link } from 'react-router-dom';
import { AccountInfoType } from '../../../store/types/accountType';

interface FrameHeaderUIProps {
  loginAccountInfo?: AccountInfoType;
  navItems?: MenuProps['items'];
  logoutCallback: () => void;
  navSelectCallback: (info: any) => void;
}

const FrameHeaderUI = (props: FrameHeaderUIProps) => {
  const menu = (
    <Menu>
      <Menu.Item icon={<ProfileOutlined />} key={'profile_info'}>
        <Link to="/profile/info">个人信息</Link>
      </Menu.Item>
      <Menu.Item icon={<LockOutlined />} key={'profile_repass'}>
        <Link to="/profile/repass">修改密码</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item icon={<LoginOutlined />} key={'profile_logout'} onClick={props.logoutCallback}>
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <Layout.Header className="admin-header">
      <div className="admin-header-logo">
        <a href="/">
          <img src={logoImg} alt="logo"></img>
          <span> AiLu Admin </span>
        </a>
      </div>
      <div className="admin-header-nav">
        <div className="admin-header-left">
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={props.navItems}
            onSelect={props.navSelectCallback}
          ></Menu>
        </div>
        <div className="admin-header-right">
          <span className="admin-header-action">
            <a target={'_blank'} href="https://github.com/phachon/ailu-admin" rel="noreferrer">
              <GithubOutlined />
            </a>
          </span>
          <Dropdown overlay={menu}>
            <span className="admin-header-action">
              <Space>
                <UserOutlined />
                {props.loginAccountInfo?.name}
              </Space>
            </span>
          </Dropdown>
        </div>
      </div>
    </Layout.Header>
  );
};

export default FrameHeaderUI;
