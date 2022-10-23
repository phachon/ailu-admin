import React, {Component, RefObject, useEffect} from 'react';
import {Button, Form, FormInstance, Input} from "antd";
import {EditLayoutForm, LayoutForm} from "../../../config/layout";
import { AccountInfoType } from '../../../store/types/accountType';
import { access } from 'fs';

interface AccountFormUIProps {
    formInstance: FormInstance<any>
    onFinishCallback: (values: any) => void
    isEdit?: boolean
    formLayout?: {
        labelCol: { span: number}
        wrapperCol: { span: number},
    }
}

const AccountFormUI = (props: AccountFormUIProps) => {

    const isEdit = props.isEdit
    let layoutForm = isEdit ? EditLayoutForm: LayoutForm
    if (props.formLayout) {
        layoutForm = props.formLayout
    }

    return (
        <div className="panel-body">
            <Form {...layoutForm}
                  name="basic"
                  onFinish={props.onFinishCallback}
                  form={props.formInstance}
            >
                {isEdit &&
                    <Form.Item
                    label="账号id"
                    name="account_id"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input disabled placeholder="请输入账号ID" />
                </Form.Item>
                }
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