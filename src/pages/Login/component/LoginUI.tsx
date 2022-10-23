import {Button, Checkbox, Col, Form, Input, Row, Tabs} from "antd";
import { GithubOutlined, LikeOutlined, UserOutlined, LockOutlined} from "@ant-design/icons";
// @ts-ignore
import logoImg from "../../../assets/images/logo_2.png";
import './login.css'
import { FormInstance } from "antd/es/form/Form";
const { TabPane } = Tabs;

interface LoginUIProps {
    systemLoginForm: FormInstance<any>
    systemLoginFinishCallback: (values: any) => void
    domainLoginForm: FormInstance<any>
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
                          <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            form={props.systemLoginForm}
                            onFinish={props.systemLoginFinishCallback}
                        >
                            <Form.Item
                                name="account_name"
                                rules={[{ required: true, message: '请输入系统登录账号!' }]}
                            >
                                <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入系统登录账号" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: '请输入系统登录密码!' }]}
                            >
                                <Input
                                    size="large"
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="请输入系统登录密码"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>自动登录</Checkbox>
                                </Form.Item>
                                <a className="login-form-forgot" href="/src/pages"> 忘记密码？</a>
                            </Form.Item>
                            <Form.Item>
                                <Button size="large" type="primary" htmlType="submit" className="login-form-button" block>
                                    系统登录
                                </Button>
                            </Form.Item>
                        </Form>
                          </TabPane>
                          <TabPane tab="域账号登录" key="2">
                              <Form
                                  name="normal_login"
                                className="login-form"
                                form={props.domainLoginForm}
                                initialValues={{ remember: true }}
                                onFinish={props.domainLoginFinishCallback}
                              >
                                <Form.Item
                                    name="username"
                                    rules={[{ required: true, message: '请输入域账号名!' }]}
                                >
                                    <Input
                                        size="large"
                                        prefix={<UserOutlined className="site-form-item-icon" />}
                                        placeholder="请输入域账号名"
                                        disabled
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: '请输入域账号密码!' }]}
                                >
                                    <Input
                                        size="large"
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="请输入域账号密码"
                                        disabled
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Form.Item name="remember" valuePropName="checked" noStyle>
                                        <Checkbox>自动登录</Checkbox>
                                    </Form.Item>
                                    <a className="login-form-forgot" href="src/pages/login/component/LoginDomain"> 忘记密码？</a>
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        size="large"
                                        type="primary"
                                        htmlType="submit"
                                        className="login-form-button"
                                        block
                                    >
                                        暂不支持域账号登录
                                    </Button>
                                </Form.Item>
                            </Form>
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