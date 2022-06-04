import {Component} from "react";
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {LoginService} from "../../../services/Login";
import {LoginResponseType} from "../../../store/types/loginType";
import {LoginAction} from "../../../store/actions/adminAction";

class LoginSystem extends Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    login(values: { account_name: string; password: string}) {
        LoginService.systemLogin({
            account_name: values.account_name,
            password: values.password,
            verify_code: "mock",
        // 登录成功
        }).then((loginInfo: LoginResponseType) => {
            this.props.loginDispatch(loginInfo)  // redux dispatch
            window.location.href = '/'
        // 登录异常
        }).catch(e => {
            console.log("system login catch: ", e)
        })
    }

    render() {
        console.log("login props:", this.props)
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
                    <a className="login-form-forgot" href="/src/pages"> 忘记密码？</a>
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

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        loginDispatch: (data: any) => {
            LoginAction(dispatch, data)
        }
    }
}

export default connect(null, mapDispatchToProps)(LoginSystem)