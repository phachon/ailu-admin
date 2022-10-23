import React from 'react';
import {Button, Form, Input} from "antd";
import { FormInstance } from 'antd/es/form/Form';

interface RoleSearchUIProps {
    formInstance: FormInstance<any>
    searchChangeCallback: (values: any) => void
    searchResetCallback: () => void
}

const RoleSearchUI = (props: RoleSearchUIProps) => {
    return (
        <div className="panel-body pdr0">
            <Form
                layout={"inline"}
                style={{justifyContent: "end"}}
                onFinish={props.searchChangeCallback}
                form={props.formInstance}
            >
                <Form.Item
                    name="role_name"
                    label="角色名"
                    style={{width: 260}}
                >
                    <Input placeholder="请输入角色名"/>
                </Form.Item>
                <Form.Item>
                    <Button type="default" htmlType={"button"} onClick={props.searchResetCallback}>重置</Button>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">查询</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default RoleSearchUI