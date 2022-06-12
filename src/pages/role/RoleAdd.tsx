import React, {Component, RefObject} from 'react';
import {Button, Form, FormInstance, Input, message} from "antd";
import {RoleService} from "../../services/Role";
import {LayoutForm} from "../../config/layout";

class RoleAdd extends Component<any, any> {

    formRef: RefObject<FormInstance>

    constructor(props: any) {
        super(props);
        this.formRef = React.createRef()
    }

    onFinish = (values: any) => {
        RoleService.roleAdd(values).then( () => {
            message.success("添加成功", 2, () => {
                window.location.href = `/role/list`
            })
        })
    }

    render() {
        return (
            <div className="panel">
                <div className="panel-body mgt18">
                    <Form
                        name="basic"
                        {...LayoutForm}
                        ref={this.formRef}
                        onFinish={this.onFinish}
                    >
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
                            wrapperCol={{offset: 3}}
                        >
                            <Button type="primary" htmlType="submit">保存</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

export default RoleAdd;