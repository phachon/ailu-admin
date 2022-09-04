import React, {Component, RefObject} from 'react';
import {Button, Form, FormInstance, Input} from "antd";
import {LayoutForm} from "../../../config/layout";

interface AccountFormUIProps {
    formRef :RefObject<FormInstance>
    onFinishCallback: (values: any) => void
    hiddenRoleIdInput?: boolean
    formLayout?: {
        labelCol: { span: number}
        wrapperCol: { span: number},
    }
}

const AccountFormUI = (props: AccountFormUIProps) => {
    const layoutForm = props.formLayout ? props.formLayout: LayoutForm
    return (
        <div className="panel-body">
            <Form {...layoutForm}
                  name="basic"
                  ref={props.formRef}
                  onFinish={props.onFinishCallback}
            >
                <Form.Item
                    label="账号id"
                    name="account_id"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    hidden={props.hiddenRoleIdInput}
                >
                    <Input disabled placeholder="请输入账号ID" />
                </Form.Item>
                <Form.Item
                    label="账号名"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: '请输入账号名!',
                        },
                    ]}
                >
                    <Input placeholder="请输入账号名"  />
                </Form.Item>

                <Form.Item
                    label="昵称"
                    name="given_name"
                    rules={[
                        {
                            required: true,
                            message: '请输入昵称!',
                        },
                    ]}
                >
                    <Input placeholder="请输入昵称" />
                </Form.Item>
                <Form.Item
                    label="邮箱"
                    name="email"
                >
                    <Input placeholder="请输入邮箱地址：xxx@xxx.com" />
                </Form.Item>
                <Form.Item
                    label="电话号"
                    name="phone"
                >
                    <Input placeholder="请输入电话号码" />
                </Form.Item>
                <Form.Item
                    label="手机号"
                    name="mobile"
                >
                    <Input placeholder="请输入手机号码" />
                </Form.Item>
                <Form.Item
                    wrapperCol={{offset: layoutForm.labelCol.span}}
                >
                    <Button type="primary" htmlType="submit">保存</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AccountFormUI;