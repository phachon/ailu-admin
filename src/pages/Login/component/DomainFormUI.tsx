import {Button, Checkbox, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {RefObject} from "react";

interface LoginDomainFormUIProps {
    formRef: RefObject<any>
    onFinishCallback: (values: any) => void
}

const LoginDomainFormUI = (props: LoginDomainFormUIProps) => {

    return (
        <Form
            name="normal_login"
            className="login-form"
            ref={props.formRef}
            initialValues={{ remember: true }}
            onFinish={props.onFinishCallback}
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
    )
}

export default LoginDomainFormUI