import React, {RefObject} from "react";
import {Button, Form, Input, message} from "antd";
import {ProfileService} from "../../services/Profile";
import {LayoutForm, LayoutFormButton} from "../../config/layout";
import {ProfileInfoType} from "../../store/types/profileType";

class ProfileInfo extends React.Component<any, any> {

    formRef :RefObject<any>

    constructor(props: any) {
        super(props);
        this.formRef = React.createRef()
    }

    onFinish(values: any) {
        ProfileService.profileUpdate(values).then(
            (res)  => {
                message.success("保存成功", () => {
                    window.location.href = `${window.location.href}`
                });
            }
        ).catch((e) => {
            console.log(e)
            message.error("保存失败")
        })
        console.log(values)
    }

    onFinishFailed() {
        message.error("保存失败", 10).then()
        console.log("err")
    }

    componentDidMount() {
        // 获取账号信息
        ProfileService.getProfileInfo().then(
            (res: ProfileInfoType) => {
                this.formRef.current.setFieldsValue(res.account_info)
            }
        ).catch(e => {
            console.log(e)
        })
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
                            label="账号ID"
                            name="account_id"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input disabled  />
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
                            <Input disabled placeholder="请输入账号名"  />
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
                            label="创建时间"
                            name="create_time"
                        >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item
                            label="修改时间"
                            name="update_time"
                        >
                            <Input disabled />
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

export default ProfileInfo