import React, {Component, RefObject} from 'react';
import {Button, Form, Input, message} from "antd";
import {AccountService} from "../../../services/Account";
import {connect} from "react-redux";
import {AccountState, AdminState} from "../../../store/states/adminState";
import {Dispatch} from "redux";
import {AccountEditCloseAction, AccountEditFinishAction} from "../../../store/actions/accountAction";

class AccountEdit extends Component<any, any> {

    formRef :RefObject<any>

    constructor(props: any) {
        super(props);
        this.formRef = React.createRef()
    }

    onFinish(values: any) {
        AccountService.accountUpdate(values).then(() => {
            message.success("修改成功", 2).then(() => {
                this.props.accountEditFinishDispatch(values)
            });
        }).catch((e) => {
            console.log(e)
        })
    }

    componentDidMount() {
        console.log("props:", this.props.editAccountInfo)
        this.formRef.current?.setFieldsValue(this.props.editAccountInfo)
    }
    render() {
        this.formRef.current?.setFieldsValue(this.props.editAccountInfo)
        return (
            <div className="panel">
                <div className="panel-body">
                    <Form
                        labelCol={{span:4}}
                        name="basic"
                        ref={this.formRef}
                        onFinish={values => {
                            this.onFinish(values)
                        }}
                        initialValues={
                            {...this.props.editAccountInfo}
                        }
                        // onFinishFailed={this.onFinishFailed}
                    >
                        <Form.Item
                            label="账号id"
                            name="account_id"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            shouldUpdate
                        >
                            <Input disabled placeholder="请输入账号名" />
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
                            shouldUpdate
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
                            shouldUpdate
                        >
                            <Input placeholder="请输入昵称" />
                        </Form.Item>
                        <Form.Item
                            label="邮箱"
                            name="email"
                            shouldUpdate
                        >
                            <Input placeholder="请输入邮箱地址：xxx@xxx.com" />
                        </Form.Item>
                        <Form.Item
                            label="电话号"
                            name="phone"
                            shouldUpdate
                        >
                            <Input placeholder="请输入电话号码" />
                        </Form.Item>
                        <Form.Item
                            label="手机号"
                            name="mobile"
                            shouldUpdate
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


const mapStateToProps = (state: AdminState): AccountState => {
    return {
        ...state.accountState
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        accountEditFinishDispatch: (data: any) => AccountEditFinishAction(dispatch, data)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountEdit);