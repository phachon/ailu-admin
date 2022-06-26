import {Button, Checkbox, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import React, {RefObject} from "react";

interface LoginSystemFormUIProps {
    formRef: RefObject<any>
    onFinishCallback: (values: any) => void
}

const LoginSystemFormUI = (props: LoginSystemFormUIProps) => {
    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            ref={props.formRef}
            onFinish={props.onFinishCallback}
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
    )
}

export default LoginSystemFormUI