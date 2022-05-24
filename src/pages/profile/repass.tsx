import React, {Component, RefObject} from 'react';
import {Button, Form, Input, message} from "antd";
import AccountService from "../../services/account";
import {LayoutForm, LayoutFormButton} from "../../config/layout";

class ProfileRepass extends Component {

    formRef :RefObject<any>

    accountService: AccountService

    constructor(props: any) {
        super(props);
        this.formRef = React.createRef()
        this.accountService = new AccountService()
    }

    onFinish(values :{old_pwd :string, new_pwd: string, confirm_pwd: string}) {

        // 判断两次密码是否一致
        if (values.confirm_pwd !== values.new_pwd) {
            message.error("确认密码与新密码不一致")
            return
        }
        this.accountService.accountUpdatePass(values).then(
            (res)  => {
                message.success("保存成功", () => {
                    window.location.href = `${window.location.href}`
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
                <div className="panel-body"></div>
                <div className="panel-body">
                    <Form {...LayoutForm} name="basic" ref={this.formRef}
                        onFinish={values => {
                            this.onFinish(values)
                        }}
                        // onFinishFailed={this.onFinishFailed}
                    >
                        <Form.Item
                            label="旧密码"
                            name="old_pwd"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入旧密码!',
                                },
                            ]}
                        >
                            <Input.Password placeholder="请输入旧密码"  />
                        </Form.Item>

                        <Form.Item
                            label="新密码"
                            name="new_pwd"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入新密码!',
                                },
                            ]}
                        >
                            <Input.Password placeholder="请输入新密码" />
                        </Form.Item>
                        <Form.Item
                            label="确认密码"
                            name="confirm_pwd"
                            rules={[
                                {
                                    required: true,
                                    message: '请再次输入新密码!',
                                },
                            ]}
                        >
                            <Input.Password placeholder="请再次输入新密码" />
                        </Form.Item>
                        <Form.Item {...LayoutFormButton}>
                            <Button type="primary" htmlType="submit">保存</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

export default ProfileRepass;