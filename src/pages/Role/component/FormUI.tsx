import React, {RefObject} from 'react';
import {Button, Form, Input} from "antd";
import {LayoutForm} from "../../../config/layout";

interface RoleFormUIProps {
    formRef: RefObject<any>
    onFinishCallback: (values: any) => void
    hiddenRoleIdInput?: boolean
    formLayout?: {
        labelCol: { span: number}
        wrapperCol: { span: number},
    }
}

const RoleFormUI = (props: RoleFormUIProps) => {
    const layoutForm = props.formLayout ? props.formLayout: LayoutForm
    return (
        <div className="panel-body">
            <Form
                name="basic"
                {...layoutForm}
                ref={props.formRef}
                onFinish={props.onFinishCallback}
            >
                <Form.Item
                    label="角色ID"
                    name="role_id"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    hidden={props.hiddenRoleIdInput}
                >
                    <Input disabled placeholder="请输入角色ID" />
                </Form.Item>
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