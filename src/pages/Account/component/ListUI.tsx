import {Popconfirm, Table, TablePaginationConfig, Tag} from "antd";
import {AccountInfoType} from "../../../store/types/accountType";
import {CheckSquareOutlined, CloseSquareOutlined, FormOutlined} from "@ant-design/icons";
import React from "react";

interface AccountListUIProps {
    listLoading: boolean,
    accountList: AccountInfoType[]
    pagination: TablePaginationConfig
    listChangeCallback: (pageConfig: TablePaginationConfig, filters: any, sorter: any) => void
    editClickCallback: (accountInfo: AccountInfoType) => void
    updateStatusCallback: (accountInfo: AccountInfoType, status: number) => void
}

const AccountListUI = (props: AccountListUIProps) => {
    return (
        <div className="panel-body">
            <Table
                rowKey={"account_id"}
                bordered={true}
                dataSource={props.accountList}
                loading={props.listLoading}
                pagination={props.pagination}
                onChange={props.listChangeCallback}
                footer={()=> ''}
            >
                <Table.Column
                    title={"账号ID"}
                    dataIndex="account_id"
                    width={80}
                    key={"account_id"}
                    align={"center"}
                />
                <Table.Column
                    title={"账号名"}
                    dataIndex="name"
                    key={"name"}
                />
                <Table.Column
                    title={"昵称"}
                    dataIndex="given_name"
                    key={"given_name"}
                />
                <Table.Column
                    title={"邮箱"}
                    dataIndex="email"
                    key={"email"}
                />
                <Table.Column
                    title={"电话号"}
                    dataIndex="phone"
                    key={"phone"}
                />
                <Table.Column
                    title={"手机号"}
                    dataIndex="mobile"
                    key={"mobile"}
                />
                <Table.Column
                    title={"状态"}
                    dataIndex="status"
                    width={70}
                    key={"status"}
                    align={"center"}
                    render={(status: number) => {
                        if(status === 0){
                            return <span><Tag color="blue">正常</Tag></span>
                        }else if(status === -1){
                            return <Tag color="error">禁用</Tag>
                        }else {
                            return <Tag color="warning">未知</Tag>
                        }
                    }}
                />
                <Table.Column
                    title={"操作"}
                    width={160}
                    key={"action"}
                    align={"center"}
                    render={(accountInfo: AccountInfoType) => (
                        <span>
                            <a onClick={() => props.editClickCallback(accountInfo)}><FormOutlined/> 修改 </a>
                            {accountInfo.status === 0 &&
                                <Popconfirm
                                    title="确定要禁用吗?"
                                    onConfirm={() => {
                                        props.updateStatusCallback(accountInfo, -1)
                                    }}
                                    okText="确定"
                                    cancelText="取消"
                                >
                                    <a><CloseSquareOutlined /> 禁用</a>
                                </Popconfirm>
                            }
                            {accountInfo.status === -1 &&
                                <Popconfirm
                                    title="确定要恢复吗?"
                                    onConfirm={() => {
                                        props.updateStatusCallback(accountInfo, 0)
                                    }}
                                    okText="确定"
                                    cancelText="取消"
                                >
                                    <a><CheckSquareOutlined /> 恢复</a>
                                </Popconfirm>
                            }
                        </span>
                    )}
                />
            </Table>
        </div>
    )
}

export default AccountListUI