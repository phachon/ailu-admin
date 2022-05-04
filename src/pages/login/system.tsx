import {Component} from "react";
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

class SystemLogin extends Component<any, any> {

    render() {
        return (
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                // onFinish={}
            >
                <Form.Item
                    name="username"
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
                    <a className="login-form-forgot" href="/"> 忘记密码？</a>
                </Form.Item>
                <Form.Item>
                    <Button size="large" type="primary" htmlType="submit" className="login-form-button" block>
                        系统登录
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default SystemLogin