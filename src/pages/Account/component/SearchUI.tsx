import {Button, Form, FormInstance, Input, Select} from "antd";
import React from "react";

interface AccountSearchUIProps {
    searchForm: FormInstance<any>
    searchChangeCallback: (values: any) => void
    searchResetCallback: () => void
}

const AccountSearchUI = (props: AccountSearchUIProps) => {

    return (
        <div className="panel-body pdr0">
            <Form
                layout={"inline"}
                style={{justifyContent: "end"}}
                onFinish={props.searchChangeCallback}
                form={props.searchForm}
            >
                <Form.Item
                    name="status"
                    label="状态"
                    initialValue={""}
                >
                    <Select>
                        <Select.Option value={""}>全部</Select.Option>
                        <Select.Option value={"0"}>正常</Select.Option>
                        <Select.Option value={"-1"}>禁用</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="account_name"
                    label="账号名"
                    style={{width: 260}}
                >
                    <Input placeholder="请输入账号名"/>
                </Form.Item>
                <Form.Item
                    name="given_name"
                    label="昵称"
                    style={{width: 260}}
                >
                    <Input placeholder="请输入昵称"/>
                </Form.Item>
                <Form.Item>
                    <Button type="default" htmlType={"button"} onClick={props.searchResetCallback}>重置</Button>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">查询</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AccountSearchUI