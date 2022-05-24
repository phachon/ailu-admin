import React, {Component, RefObject} from 'react';
import {Button, Form, Input, message} from "antd";
import AccountService from "../../services/account";

class AccountEdit extends Component {

    formRef :RefObject<any>

    constructor(props: any) {
        super(props);
        this.formRef = React.createRef()
    }

    onFinish(values: any) {
        AccountService.accountUpdate(values).then(
            (res)  => {
                message.success("修改成功", () => {
                    window.location.href = `/account/list`
                });
            }
        ).catch((e) => {
            console.log(e)
        })
        console.log(values)
    }

    render() {
        return (
            <div className="panel">
                <div className="panel-body ">
                    <Form labelCol={{span:4}} name="basic" ref={this.formRef}
                          onFinish={values => {
                              this.onFinish(values)
                          }}
                        // onFinishFailed={this.onFinishFailed}
                    >
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
                        <Form.Item wrapperCol={{offset: 4}}>
                            <Button type="primary" htmlType="submit">保存</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

export default AccountEdit;