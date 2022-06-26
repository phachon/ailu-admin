import {Col, Row, Tabs} from "antd";
import {GithubOutlined, LikeOutlined} from "@ant-design/icons";
import React, {RefObject} from "react";
import LoginSystemFormUI from "./SystemFormUI";
import LoginDomainFormUI from "./DomainFormUI";
// @ts-ignore
import logoImg from "../../../assets/images/logo_2.png";
import './login.css'
const { TabPane } = Tabs;

interface LoginUIProps {
    systemLoginFormRef: RefObject<any>
    systemLoginFinishCallback: (values: any) => void
    domainLoginFormRef: RefObject<any>
    domainLoginFinishCallback: (values: any) => void
}

const LoginUI = (props: LoginUIProps) => {
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
              <Row justify="center">
                  <Col span={6}>
                      <Tabs defaultActiveKey="1" centered>
                          <TabPane tab="系统账号登录" key="1">
                              <LoginSystemFormUI
                                formRef={props.systemLoginFormRef}
                                onFinishCallback={props.systemLoginFinishCallback}
                              />
                          </TabPane>
                          <TabPane tab="域账号登录" key="2">
                              <LoginDomainFormUI
                                  formRef={props.domainLoginFormRef}
                                  onFinishCallback={props.domainLoginFinishCallback}
                              />
                          </TabPane>
                      </Tabs>
                  </Col>
              </Row>
          </div>
          <div className="login-footer">
              <p className="login-footer-recommed">* 推荐使用 Chrome 或 FireFox 浏览器访问 *</p>
              <p className="login-footer-copyright">
                  <a href="https://github.com/phachon/ailu-admin" target="_black">AiLu-Admin</a> © 2022 Created by
                  <a href="https://github.com/phachon" target="_black"> phachon</a>
                  <a href="https://github.com/phachon/ailu-admin" target="_black"> <LikeOutlined /> <GithubOutlined /></a>
              </p>
          </div>
      </div>
  )
}

export default LoginUI