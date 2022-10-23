import React, {RefObject} from 'react';
import {Button, Form, Input} from "antd";
import {EditLayoutForm, LayoutForm} from "../../../config/layout";
import { FormInstance } from 'antd/es/form/Form';

interface RoleFormUIProps {
    formInstance: FormInstance<any>
    onFinishCallback: (values: any) => void
    isEdit?: boolean
    formLayout?: {
        labelCol: { span: number}
        wrapperCol: { span: number},
    }
}

const RoleFormUI = (props: RoleFormUIProps) => {
    let layoutForm = props.isEdit ? EditLayoutForm: LayoutForm
    if (props.formLayout) {
        layoutForm = props.formLayout
    }
    return (
        <div className="panel-body">
            <Form
                name="basic"
                {...layoutForm}
                form={props.formInstance}
                onFinish={props.onFinishCallback}
            >
                {props.isEdit && 
                    <Form.Item
                        label="角色ID"
                        name="role_id"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input disabled placeholder="请输入角色ID" />
                    </Form.Item>
                }
                <Form.Item
                    label="角色名"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: '请输入角色名!',
                        },
                    ]}
                >
                    <Input placeholder="请输入角色名"  />
                </Form.Item>
                <Form.Item
                    wrapperCol={{offset: layoutForm.labelCol.span}}
                >
                    <Button type="primary" htmlType="submit">保存</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default RoleFormUI;