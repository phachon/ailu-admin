import { Button, Checkbox, Col, Form, Input, Row, Tabs } from 'antd';
import { GithubOutlined, LikeOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
// @ts-ignore
import logoImg from '../../../assets/images/logo_2.png';
import './login.css';
const { TabPane } = Tabs;

interface LoginUIProps {
  systemLoginFinishCallback: (values: any) => void;
  domainLoginFinishCallback: (values: any) => void;
}

/**
 * 系统登录 UI 组件
 * @param props
 * @returns
 */
const SystemLoginUI = (props: LoginUIProps) => {
  const [systemLoginForm] = Form.useForm();

  return (
    <Form
      name="system_login"
      className="login-form"
      initialValues={{ remember: true }}
      form={systemLoginForm}
      onFinish={props.systemLoginFinishCallback}
    >
      <Form.Item name="account_name" rules={[{ required: true, message: '请输入系统登录账号!' }]}>
        <Input
          size="large"
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="请输入系统登录账号"
        />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: '请输入系统登录密码!' }]}>
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
        <a className="login-form-forgot" href="/src/pages">
          {' '}
          忘记密码？
        </a>
      </Form.Item>
      <Form.Item>
        <Button size="large" type="primary" htmlType="submit" className="login-form-button" block>
          系统登录
        </Button>
      </Form.Item>
    </Form>
  );
};

/**
 * 域账号登录 UI 组件
 * @param props
 * @returns
 */
const DomainLoginUI = (props: LoginUIProps) => {
  const [domainLoginForm] = Form.useForm();

  return (
    <Form
      name="domain_login"
      className="login-form"
      form={domainLoginForm}
      initialValues={{ remember: true }}
      onFinish={props.domainLoginFinishCallback}
    >
      <Form.Item name="username" rules={[{ required: true, message: '请输入域账号名!' }]}>
        <Input
          size="large"
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="请输入域账号名"
          disabled
        />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: '请输入域账号密码!' }]}>
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
        <a className="login-form-forgot" href="src/pages/login/component/LoginDomain">
          {' '}
          忘记密码？
        </a>
      </Form.Item>
      <Form.Item>
        <Button size="large" type="primary" htmlType="submit" className="login-form-button" block>
          暂不支持域账号登录
        </Button>
      </Form.Item>
    </Form>
  );
};
/**
 * 登录 UI 组件
 * @param props 登录 UI 组件 props
 * @returns 登录 UI 组件
 */
const LoginUI = (props: LoginUIProps) => {
  const items = [
    { label: '系统账号登录', key: '1', children: <SystemLoginUI {...props} /> },
    { label: '域账号登录', key: '2', children: <DomainLoginUI {...props} /> },
  ];

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
            <Tabs defaultActiveKey="1" items={items} centered></Tabs>
          </Col>
        </Row>
      </div>
      <div className="login-footer">
        <p className="login-footer-recommed">* 推荐使用 Chrome 或 FireFox 浏览器访问 *</p>
        <p className="login-footer-copyright">
          <a href="https://github.com/phachon/ailu-admin" target="_black">
            AiLu-Admin
          </a>{' '}
          © 2022 Created by
          <a href="https://github.com/phachon" target="_black">
            {' '}
            phachon
          </a>
          <a href="https://github.com/phachon/ailu-admin" target="_black">
            {' '}
            <LikeOutlined /> <GithubOutlined />
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginUI;
