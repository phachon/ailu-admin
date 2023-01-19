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
import { ItemType } from 'antd/lib/menu/hooks/useItems';

interface FrameHeaderUIProps {
  loginAccountInfo?: AccountInfoType;
  navItems?: MenuProps['items'];
  logoutCallback: () => void;
  navSelectCallback: (info: any) => void;
}

const FrameHeaderUI = (props: FrameHeaderUIProps) => {
  const menuItems: MenuProps['items'] = [
    {
      label: <Link to="/profile/info">个人信息</Link>,
      key: 'profile_info',
      icon: <ProfileOutlined />,
    },
    {
      label: <Link to="/profile/repass">修改密码</Link>,
      key: 'profile_repass',
      icon: <LockOutlined />,
    },
    {
      type: 'divider',
    },
    {
      label: <a onClick={props.logoutCallback}>退出登录</a>,
      key: 'profile_logout',
      icon: <LoginOutlined />,
    },
  ];
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
          <Dropdown menu={{ items: menuItems }}>
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
