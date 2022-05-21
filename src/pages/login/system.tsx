import {Component} from "react";
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import LoginService from "../../services/login";
import {LoginResponse, loginTokenStore} from "../../store/login";

class LoginSystem extends Component<any, any> {

    login(values: { account_name: string; password: string}) {
        let loginService = new LoginService()
        console.log(values)
        loginService.systemLogin({
            account_name: values.account_name,
            password: values.password,
            verify_code: "mock",
        // 登录成功
        }).then((res: LoginResponse) => {
            // redux =>
            console.log(res.login_token)
            loginTokenStore.storageToken(res.login_token) // 设置 token
            window.location.href = '/home'
        // 登录异常
        }).catch(e => {
            console.log("system login catch: ", e)
        })
    }

    render() {
        return (
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={
                    values => {
                        this.login(values)
                    }
                }
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

export default LoginSystem