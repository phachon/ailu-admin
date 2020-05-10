import React from 'react';
import { Tabs, Row, Col } from 'antd';
import { GithubOutlined, LikeOutlined } from '@ant-design/icons';

import SystemLogin from '../components/LoginTab/SystemLogin';
import DomainLogin from '../components/LoginTab/DomainLogin';
import logoImg from '../assets/images/logo_2.png'

const { TabPane } = Tabs;

class LoginLayout extends React.Component {

  render () {
    return (
      <div className="login">
        <div className="login-header">
          <div className="login-title">
            <img src={logoImg} alt="logo"></img>
            <span>AiLu-Admin 系统登录</span>
          </div>
          <p>一个基于 React + Antd 开发的中后台管理系统</p>
        </div>
        <div className="login-content">
          <Row>
            <Col offset={9} span={6}>
              <Tabs defaultActiveKey="1">
                <TabPane tab="系统账号登录" key="1">
                  <SystemLogin />
                </TabPane>
                <TabPane tab="域账号登录" key="2">
                  <DomainLogin />
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </div>
        <div className="login-footer">
          <p className="login-footer-recommed">* 推荐使用 Chrome 或 FireFox 浏览器访问 *</p>
          <p className="login-footer-copyright">
            <a href="https://github.com/phachon/ailu-admin" target="_black">AiLu-Admin</a> © 2020 Created by
            <a href="https://github.com/phachon" target="_black"> phachon</a>
            <a href="https://github.com/phachon/ailu-admin" target="_black"> <LikeOutlined /> <GithubOutlined /></a>
          </p>
        </div>
      </div>
    );
  }
}

export default LoginLayout;